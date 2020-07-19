import React from 'react';
import { startSetMissions } from '../actions/missions'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import { startSetCharacters } from '../actions/characters';
import { startSetTransactions } from '../actions/transactions';

class MissionList extends React.Component {

  componentDidMount() {
    this.props.startSetMissions()
    this.props.startSetCharacters()
    this.props.startSetTransactions()
  }

  render() {

    return (
      <div>
        <h1>Mission List</h1>
        {(
          this.props.charactersIsLoading ||
          this.props.missionsIsLoading ||
          this.props.transactionsIsLoading
        ) ? null : 
          <Table striped bordered size='sm'>
            <thead>
              <tr>
                <th>Episode #</th>
                <th>Name</th>
                <th>Date Played</th>
                <th>DM</th>
                <th>Characters</th>
                <th>Transactions</th>
              </tr>
            </thead>
            <tbody>
              {this.props.missions.map((mission) => {
                const dm = this.props.characters.find(character => character.id === mission.dm)
                return (
                  <tr key={mission.id}>
                    <td>{mission.episode}</td>
                    <td>
                      <NavLink 
                        to={`/missions/${mission.id}`} 
                        activeClassName="is-active"
                      >{mission.name}</NavLink>
                    </td>
                    <td>
                      {mission.playedOn}
                    </td>
                    <td>
                      {`${dm.firstName} ${dm.lastName}`}
                    </td>
                    <td>
                      {mission.characters.map((pc) => {
                        const character = this.props.characters.find(character => character.id === pc)
                        return <div key={character.id}>{`${character.firstName} ${character.lastName}`}</div>
                      })}
                    </td>
                    <td>
                      {this.props.transactions.filter(transaction => transaction.mission === mission.id).length}
                    </td>
                </tr>
              )})}
            </tbody>
          </Table>
        }
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  startSetMissions: () => dispatch(startSetMissions()),
  startSetCharacters: () => dispatch(startSetCharacters()),
  startSetTransactions: () => dispatch(startSetTransactions()),
})

const mapStateToProps = (state, props) => ({
  missions: state.missions.data.filter(mission => mission.visable === true),
  characters: state.characters.data,
  transactions: state.transactions.data,
  missionsIsLoading : state.missions.isLoading,
  charactersIsLoading: state.characters.isLoading,
  transactionsIsLoading: state.transactions.isLoading,
})


export default connect(mapStateToProps,mapDispatchToProps)(MissionList);