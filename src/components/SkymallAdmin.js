import React from "react";
import { startSetItems, startUpdateItem } from "../actions/items";
import { connect } from "react-redux";

class SkymallAdmin extends React.Component {
  componentDidMount() {
    this.props.startSetItems();
  }

  onAddItemClick = (e) => {
    const itemId = e.target.getAttribute("data-key");
    const foundItem = this.props.items.find(
      (item) => item.id.toString() === itemId
    );
    this.props.startUpdateItem(foundItem.id, {
      numberInSkymall: foundItem.numberInSkymall + 1,
    });
  };

  render() {
    return (
      <div>
        <h1>Skymall Admin</h1>
        {this.props.itemsIsLoading ? null : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Cost (in gold) </th>
                <th>Desctiption</th>
                <th>Number in Skymall</th>
                <th>Add to Skymall</th>
              </tr>
            </thead>
            <tbody>
              {this.props.items.map((item) => {
                return (
                  <tr key={item.id}>
                    <td> {item.name} </td>
                    <td>
                      {" "}
                      {`${item.costGold}.${item.costSilver}${item.costCopper}`}{" "}
                    </td>
                    <td> {item.description} </td>
                    <td> {item.numberInSkymall} </td>
                    <td>
                      <button
                        variant="info"
                        onClick={this.onAddItemClick}
                        data-key={item.id}
                      >
                        Add Item to Skymall
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
