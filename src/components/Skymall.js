import React from "react";
import { startSetItems, startUpdateItem } from "../actions/items";
import { connect } from "react-redux";
import Select from "react-select";
import { totalBalance } from "../functions/money";
import { startAddItemsOwned } from "../actions/itemsowned";
import {
  startaddTransaction,
  startSetTransactions,
} from "../actions/transactions";
import { startSetMissions } from "../actions/missions";
import { startSetCharacters } from "../actions/characters";
import ValidationMessage from "./ValidationMessage";
import SkymallTable from "./SkymallTable";

class Skymall extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      character: "",
      purchaseValid: true,
      errorMsg: {},
      filter: "",
    };
  }

  componentDidMount() {
    this.props.startSetItems();
    this.props.startSetMissions();
    this.props.startSetCharacters();
    this.props.startSetTransactions();
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
    const foundItem = this.props.items.find(
      (item) => item.id.toString() === itemId
    );
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
      ) > parseFloat(`${gold}.${silver}${copper}`)
    ) {
      this.setState({
        purchaseValid: false,
        errorMsg: { purchase: "You do not have enough gold for this purchase" },
      });
    } else {
      this.setState({ purchaseValid: true, errorMsg: {} });
      this.props.startUpdateItem(foundItem.id, {
        numberInSkymall: foundItem.numberInSkymall - 1,
      });
      this.props.startAddItemsOwned({
        item: foundItem.id,
        character: this.state.character.value,
      });
      this.props.startaddTransaction({
        name: `Bought ${foundItem.name}`,
        goldPcs: foundItem.costGold,
        silverPcs: foundItem.costSilver,
        copperPcs: foundItem.costCopper,
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
        label: `${character.firstName} ${character.lastName}`,
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
        <h1>Skymall</h1>
        {this.props.charactersIsLoading ||
        this.props.transactionsIsLoading ? null : (
          <div>
            <div>
              <label>Purchasing Character</label>
              <Select
                options={selectCharacterOptions}
                value={this.state.character}
                onChange={this.onCharacterChange}
              />
            </div>
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
          </div>
        )}
        <label>Filter</label>
        <input
          type="text"
          value={this.state.filter}
          onChange={this.onFilterChange}
          placeholder="Use this to filter items in the store"
        />
        {this.props.missionsIsLoading ||
        this.props.transactionsIsLoading ||
        this.props.itemsIsLoading ? null : (
          <div>
            <h2>Weapons</h2>
            <SkymallTable
              items={this.props.items}
              filteredItems={filteredItems.filter(
                (item) => item.typeOfItem === "Weapon"
              )}
              onBuyItemClick={this.onBuyItemClick}
            />
            <h2>Armor</h2>
            <SkymallTable
              items={this.props.items}
              filteredItems={filteredItems.filter(
                (item) => item.typeOfItem === "Armor"
              )}
              onBuyItemClick={this.onBuyItemClick}
            />
            <h2>Gear</h2>
            <SkymallTable
              items={this.props.items}
              filteredItems={filteredItems.filter(
                (item) => item.typeOfItem === "Gear"
              )}
              onBuyItemClick={this.onBuyItemClick}
            />
            <h2>Magic Items</h2>
            <SkymallTable
              items={this.props.items}
              filteredItems={filteredItems.filter(
                (item) => item.typeOfItem === "Magic"
              )}
              onBuyItemClick={this.onBuyItemClick}
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
  startAddItemsOwned: (itemOwned) => dispatch(startAddItemsOwned(itemOwned)),
  startSetCharacters: () => dispatch(startSetCharacters()),
  startaddTransaction: (transaction) =>
    dispatch(startaddTransaction(transaction)),
  startSetMissions: () => dispatch(startSetMissions()),
  startSetTransactions: () => dispatch(startSetTransactions()),
});

const mapStateToProps = (state, props) => ({
  items: state.items.data,
  characters: state.characters.data.filter(
    (character) => character.creator === state.auth.user.id && !character.dead
  ),
  missions: state.missions.data,
  transactions: state.transactions.data,

  itemsIsLoading: state.items.isLoading,
  charactersIsLoading: state.characters.isLoading,
  missionsIsLoading: state.missions.isLoading,
  transactionsIsLoading: state.transactions.isLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(Skymall);
