import React from "react";
import { startSetItems, startUpdateItem } from "../actions/items";
import { connect } from "react-redux";
import Select from "react-select";
import { totalBalance } from "../functions/money";
import { startAddItemsOwned, startSetItemsOwned, startUpdateItemOwned } from "../actions/itemsowned";
import {
  startAddTransaction,
  startSetTransactions,
} from "../actions/transactions";
import { startSetMissions } from "../actions/missions";
import { startSetCharacters } from "../actions/characters";
import ValidationMessage from "./ValidationMessage";
import SkymallTable from "./SkymallTable";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

class Skymall extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      character: "",
      purchaseValid: true,
      errorMsg: {},
      filter: "",
      showAlert: false,
    };
  }

  componentDidMount() {
    this.props.startSetItems();
    this.props.startSetMissions();
    this.props.startSetCharacters();
    this.props.startSetTransactions();
    this.props.startSetItemsOwned();
  }

  onCharacterChange = (selectedValue) => {
    this.setState({ character: selectedValue });
    this.setState({ purchaseValid: true, errorMsg: {} });
  };

  onFilterChange = (e) => {
    const filter = e.target.value;
    this.setState({ filter });
  };

  onBuyItemClick = (e) => {
    const itemId = e.target.getAttribute("data-key");
    const qty = e.target.getAttribute("data-qty");
    const foundItem = this.props.items.find(
      (item) => item.id.toString() === itemId
    );
    if (
      !Number.isInteger(Number(qty)) ||
      foundItem.numberInSkymall < qty ||
      qty < 1
    ) {
      this.setState({ showAlert: true });
    }

    const { gold, silver, copper } = totalBalance(
      this.props.transactions.filter((transaction) =>
        transaction.characters.some(
          (character) => character === this.state.character.value
        )
      )
    );

    if (this.state.character === "") {
      this.setState({
        purchaseValid: false,
        errorMsg: {
          purchase: "You must select a character to make a purchase",
        },
      });
    } else if (
      parseFloat(
        `${foundItem.costGold}.${foundItem.costSilver}${foundItem.costCopper}`
      ) *
        qty >
      parseFloat(`${gold}.${silver}${copper}`)
    ) {
      this.setState({
        purchaseValid: false,
        errorMsg: { purchase: "You do not have enough gold for this purchase" },
      });
    } else {
      this.setState({ purchaseValid: true, errorMsg: {} });
      this.props.startUpdateItem(foundItem.id, {
        numberInSkymall: foundItem.numberInSkymall - qty,
      });

      if (this.props.itemsOwned.find(itemOwned => itemOwned.item === foundItem.id && itemOwned.character === this.state.character.value)) {
        const itemOwned = this.props.itemsOwned.find(itemOwned => itemOwned.item === foundItem.id && itemOwned.character === this.state.character.value);
        console.log(itemOwned, parseInt(itemOwned.qty) + parseInt(qty))
        this.props.startUpdateItemOwned(itemOwned.id, {
          qty: itemOwned.qty + parseInt(qty)
        })

      } else {
        this.props.startAddItemsOwned({
          item: foundItem.id,
          character: this.state.character.value,
          qty: qty,
        });

      }

      const goldCost = foundItem.costGold * qty;
      const silverCost = foundItem.costSilver * qty;
      const copperCost = foundItem.costCopper * qty;

      this.props.startAddTransaction({
        name: `Bought ${foundItem.name} (x${qty})`,
        goldPcs: goldCost,
        silverPcs: silverCost,
        copperPcs: copperCost,
        mission: this.props.missions.find(
          (mission) => mission.name === "Skymall"
        ).id,
        characters: [this.state.character.value],
        airshipPot: false,
        earnedSpent: -1,
      });
    }
  };

  render() {
    const selectCharacterOptions = this.props.characters.map((character) => {
      return {
        value: character.id,
        label: `${character.fullName}`,
      };
    });

    const { gold, silver, copper } = totalBalance(
      this.props.transactions.filter((transaction) =>
        transaction.characters.some(
          (character) => character === this.state.character.value
        )
      )
    );

    const filteredItems = this.props.items.filter((item) => {
      const nameMatch = item.name
        .toLowerCase()
        .includes(this.state.filter.toLowerCase());
      const typeMatch = item.typeOfItem
        .toLowerCase()
        .includes(this.state.filter.toLowerCase());
      return nameMatch || typeMatch;
    });

    return (
      <div className="div-margin-sm">
        <Alert
          show={this.state.showAlert}
          variant="danger"
          onClose={() => this.setState({ showAlert: false })}
          dismissible
        >
          <Alert.Heading>There was an Issue!</Alert.Heading>
          <p>
            You must make the quantity to buy a whole number and must be less
            than or equal to number currently in the skymall.
          </p>
        </Alert>
        <h1>Skymall</h1>
        {this.props.charactersIsLoading ||
        this.props.transactionsIsLoading ? null : (
          <Form.Group>
            <Form.Label>Purchasing Character</Form.Label>
            <Select
              options={selectCharacterOptions}
              value={this.state.character}
              onChange={this.onCharacterChange}
            />
            {this.state.character === "" ? (
              <div>Select a character to purchase items</div>
            ) : (
              <div>
                {`${this.state.character.label} has ${gold}.${silver}${copper} gold to spend.`}
              </div>
            )}
            <ValidationMessage
              valid={this.state.purchaseValid}
              message={this.state.errorMsg.purchase}
            />
          </Form.Group>
        )}
        <Form.Group>
          <Form.Label>Filter</Form.Label>
          <Form.Control
            type="text"
            value={this.state.filter}
            onChange={this.onFilterChange}
            placeholder="Use this to filter items in the store"
          />
        </Form.Group>

        {this.props.missionsIsLoading ||
        this.props.transactionsIsLoading ||
        this.props.itemsIsLoading ||
        this.props.itemsOwnedIsLoading ? <div>Loading...</div> : (
          <div>
            <h2>Weapons</h2>
            <SkymallTable
              items={this.props.items}
              filteredItems={filteredItems.filter(
                (item) =>
                  item.typeOfItem === "Weapon" &&
                  item.numberInSkymall > 0 &&
                  item.allPcsCanPurchase
              )}
              onClick={this.onBuyItemClick}
            />
            <h2>Armor</h2>
            <SkymallTable
              items={this.props.items}
              filteredItems={filteredItems.filter(
                (item) =>
                  item.typeOfItem === "Armor" &&
                  item.numberInSkymall > 0 &&
                  item.allPcsCanPurchase
              )}
              onClick={this.onBuyItemClick}
            />
            <h2>Gear</h2>
            <SkymallTable
              items={this.props.items}
              filteredItems={filteredItems.filter(
                (item) =>
                  item.typeOfItem === "Gear" &&
                  item.numberInSkymall > 0 &&
                  item.allPcsCanPurchase
              )}
              onClick={this.onBuyItemClick}
            />
            <h2>Magic Items</h2>
            <SkymallTable
              items={this.props.items}
              filteredItems={filteredItems.filter(
                (item) =>
                  item.typeOfItem === "Magic" &&
                  item.numberInSkymall > 0 &&
                  item.allPcsCanPurchase
              )}
              onClick={this.onBuyItemClick}
            />
            <h2>Spell Components</h2>
            <SkymallTable
              items={this.props.items}
              filteredItems={filteredItems.filter(
                (item) =>
                  item.typeOfItem === "Component" &&
                  item.numberInSkymall > 0 &&
                  item.allPcsCanPurchase
              )}
              onClick={this.onBuyItemClick}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  startSetItems: () => dispatch(startSetItems()),
  startUpdateItem: (id, updates) => dispatch(startUpdateItem(id, updates)),
  startSetItemsOwned: () => dispatch(startSetItemsOwned()),
  startAddItemsOwned: (itemOwned) => dispatch(startAddItemsOwned(itemOwned)),
  startSetCharacters: () => dispatch(startSetCharacters()),
  startAddTransaction: (transaction) =>
    dispatch(startAddTransaction(transaction)),
  startSetMissions: () => dispatch(startSetMissions()),
  startSetTransactions: () => dispatch(startSetTransactions()),
  startUpdateItemOwned: (id, updates) => dispatch(startUpdateItemOwned(id, updates)),
});

const mapStateToProps = (state, props) => ({
  items: state.items.data,
  characters: state.characters.data.filter(
    (character) => character.creator === state.auth.user.id && !character.dead
  ),
  missions: state.missions.data,
  transactions: state.transactions.data,
  itemsOwned: state.itemsOwned.data,

  itemsIsLoading: state.items.isLoading,
  charactersIsLoading: state.characters.isLoading,
  missionsIsLoading: state.missions.isLoading,
  transactionsIsLoading: state.transactions.isLoading,
  itemsOwnedIsLoading: state.itemsOwned.isLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(Skymall);
