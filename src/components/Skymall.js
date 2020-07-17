import React from 'react';
import { startSetItems, startUpdateItem } from '../actions/items'
import Table from 'react-bootstrap/Table';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';
import Form from 'react-bootstrap/Form';
import {totalBalance} from '../functions/money';
import { startAddItemsOwned } from '../actions/itemsowned';
import { startaddTransaction, startSetTransactions } from '../actions/transactions';
import { startSetMissions } from '../actions/missions';
import { startSetCharacters } from '../actions/characters';

class Skymall extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      character: '',
    }
  }
  
  componentDidMount() {
    this.props.startSetItems()
    this.props.startSetMissions()
    this.props.startSetCharacters()
    this.props.startSetTransactions()    
  }

  onCharacterChange = (selectedValue) => {
    const pcs = selectedValue
    const transactions =  this.props.transactions.filter(transaction => 
      transaction.characters.some(character => character === selectedValue.value)
    )
    console.log(transactions)
    const {gold, silver, copper} = totalBalance(transactions)
    this.setState({characterGold: parseFloat(`${gold}.${silver}${copper}`)})
    this.setState({ character: pcs })
  }

  onAddItemClick = (e) => {
    const itemId = e.target.getAttribute("data-key")
    const foundItem = this.props.items.find(item => item.id.toString() === itemId)
    this.props.startUpdateItem(foundItem.id, {numberInSkymall: foundItem.numberInSkymall + 1})
  }

  onBuyItemClick = (e) => {
    const itemId = e.target.getAttribute("data-key")
    const foundItem = this.props.items.find(item => item.id.toString() === itemId)
    const {gold, silver, copper} = totalBalance(
      this.props.transactions.filter(transaction => 
        transaction.characters.some(character => character === this.state.character.value)
      ) 
    )
    if (parseFloat(`${foundItem.costGold}.${foundItem.costSilver}${foundItem.costCopper}`) > parseFloat(`${gold}.${silver}${copper}`)) {
      console.log("not enough gold")
    } else {
      this.props.startUpdateItem(foundItem.id, {numberInSkymall: foundItem.numberInSkymall -1 })
      this.props.startAddItemsOwned({
        item: foundItem.id, 
        character: this.state.character.value
      })
      this.props.startaddTransaction({
        name: `Bought ${foundItem.name}`,
        goldPcs: foundItem.costGold,
        silverPcs: foundItem.costSilver,
        copperPcs: foundItem.costCopper,
        mission: this.props.missions.find(mission => mission.name === "Skymall").id,
        characters:  [this.state.character.value],
        airshipPot:  false,
        earnedSpent: -1
      })      
    }
  }

  render() {
    const selectCharacterOptions = this.props.characters.map(character => {
      return {value: character.id, label: `${character.firstName} ${character.lastName}`}
    })

    const {gold, silver, copper} = totalBalance(
      this.props.transactions.filter(transaction => 
        transaction.characters.some(character => character === this.state.character.value)
      )
    )

    return (
      <div>
        <h1>Skymall</h1>
        {this.props.charactersIsLoading || this.props.transactionsIsLoading ? null :
          <div>
            <div>
              <Form.Label>Purchasing Character</Form.Label>
              <Select
                options={selectCharacterOptions}
                value={this.state.character}
                onChange={this.onCharacterChange}
              />
            </div>
            {this.state.character === '' ? <div>Select a character to purchase items</div> :
              <div>
                {`${this.state.character.label} has ${gold}.${silver}${copper} gold to spend.`}
              </div>
            }
          </div>
        }
        {this.props.missionsIsLoading || this.props.transactionsIsLoading || this.props.itemsIsLoading ? null :
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Cost (in gold) </th>
                <th>Desctiption</th>
                <th>Number in Skymall</th>
                <th>Add to Skymall</th>
                <th>Buy</th>
              </tr>
            </thead>
            <tbody>
              {this.props.items.filter(item => item.numberInSkymall > 0).map((item) => {
                return (
                <tr key={item.id}>
                  <td> {item.name} </td>
                  <td> {`${item.costGold}.${item.costSilver}${item.costCopper}`} </td>
                  <td> {item.description} </td>
                  <td> {item.numberInSkymall} </td>
                  <td><Button variant="info" onClick={this.onAddItemClick} data-key={item.id}>Add Item to Skymall</Button></td>
                  <td><Button variant="success" onClick={this.onBuyItemClick} data-key={item.id}>Buy Item</Button></td>
                </tr>
                )
              })}
            </tbody>
          </Table>
        }
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  startSetItems: () => dispatch(startSetItems()),
  startUpdateItem: (id, updates) => dispatch(startUpdateItem(id, updates)),
  startAddItemsOwned: (itemOwned) => dispatch(startAddItemsOwned(itemOwned)),
  startSetCharacters: () => dispatch(startSetCharacters()),
  startaddTransaction: (transaction) => dispatch(startaddTransaction(transaction)),
  startSetMissions: () => dispatch(startSetMissions()),
  startSetTransactions: () => dispatch(startSetTransactions()),
})

const mapStateToProps = (state, props) => ({
  items: state.items.data,
  characters: state.characters.data.filter(character => character.creator === state.auth.user.id),
  missions: state.missions.data,
  transactions: state.transactions.data,

  itemsIsLoading: state.items.isLoading,
  charactersIsLoading: state.characters.isLoading,
  missionsIsLoading: state.missions.isLoading,
  transactionsIsLoading: state.transactions.isLoading,
})

export default connect(mapStateToProps,mapDispatchToProps)(Skymall)