import React from "react";
import { startSetItems, startUpdateItem } from "../actions/items";
import { connect } from "react-redux";
import SkymallTable from './SkymallTable'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'

class SkymallAdmin extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      filter: "",
      showAlert: false,
    };
  }

  componentDidMount() {
    this.props.startSetItems();
  }

  onFilterChange = (e) => {
    const filter = e.target.value;
    this.setState({ filter });
  };

  onAddItemClick = (e) => {
    const itemId = e.target.getAttribute("data-key");
    const qty = e.target.getAttribute("data-qty");
    console.log(qty)

    if (!Number.isInteger(Number(qty)) || qty < 1) {
      this.setState({showAlert: true})
    } else {
      const foundItem = this.props.items.find(
        (item) => item.id.toString() === itemId
      );
      const newQty = parseInt(foundItem.numberInSkymall) + parseInt(qty)

      this.props.startUpdateItem(foundItem.id, {
        numberInSkymall: newQty,
      });
    }
  };

  render() {

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
        <Alert show={this.state.showAlert} variant="danger" onClose={() => this.setState({showAlert: false})} dismissible>
          <Alert.Heading>There was an Issue!</Alert.Heading>
          <p>You must make the quantity to add a whole number.</p>
        </Alert>

        <h1>Skymall Admin</h1>
        <Form.Group>
          <Form.Label>Filter</Form.Label>
          <Form.Control
            type="text"
            value={this.state.filter}
            onChange={this.onFilterChange}
            placeholder="Use this to filter items in the store"
          />
        </Form.Group>
        {this.props.itemsIsLoading ? null : (
          <>
            <h2>Weapons</h2>
            <SkymallTable
              items={this.props.items}
              filteredItems={filteredItems.filter(
                (item) => item.typeOfItem === "Weapon" && item.allPcsCanPurchase
              )}
              onClick={this.onAddItemClick}
              skymallAdmin={true}
            />
            <h2>Armor</h2>
            <SkymallTable
              items={this.props.items}
              filteredItems={filteredItems.filter(
                (item) => item.typeOfItem === "Armor" && item.allPcsCanPurchase
              )}
              onClick={this.onAddItemClick}
              skymallAdmin={true}
            />
            <h2>Gear</h2>
            <SkymallTable
              items={this.props.items}
              filteredItems={filteredItems.filter(
                (item) => item.typeOfItem === "Gear" && item.allPcsCanPurchase
              )}
              onClick={this.onAddItemClick}
              skymallAdmin={true}
            />
            <h2>Magic Items</h2>
            <SkymallTable
              items={this.props.items}
              filteredItems={filteredItems.filter(
                (item) => item.typeOfItem === "Magic" && item.allPcsCanPurchase
              )}
              onClick={this.onAddItemClick}
              skymallAdmin={true}
            />
            <h2>Spell Components</h2>
            <SkymallTable
              items={this.props.items}
              filteredItems={filteredItems.filter(
                (item) => item.typeOfItem === "Component" && item.numberInSkymall > 0 && item.allPcsCanPurchase
              )}
              onClick={this.onBuyItemClick}
            />
          </>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  startSetItems: () => dispatch(startSetItems()),
  startUpdateItem: (id, updates) => dispatch(startUpdateItem(id, updates)),
});

const mapStateToProps = (state, props) => ({
  items: state.items.data,

  itemsIsLoading: state.items.isLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(SkymallAdmin);
