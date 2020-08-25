import React from "react";
import { startSetMissions } from "../actions/missions";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { startSetCharacters } from "../actions/characters";
import { startSetTransactions } from "../actions/transactions";
import EditMissionForm from './EditMissionForm';
import EditButton from './EditButton';
import Modal from "react-bootstrap/Modal";

class MissionList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showEditMissionModal: false,
      missionSelected: '',
    }
  }

  componentDidMount() {
    this.props.startSetMissions();
    this.props.startSetCharacters();
    this.props.startSetTransactions();
  }

  handleEditMissionModalClose = () => this.setState({showEditMissionModal : false});
  handleEditMissionModalShow = () => this.setState({showEditMissionModal : true});

  selectMission = (mission) => {
    this.setState({missionSelected : mission}, this.handleEditMissionModalShow);
  }

  render() {
    return (
      <>
        <Modal
            show={this.state.showEditMissionModal}
            onHide={this.handleEditMissionModalClose}
          >
            <EditMissionForm 
              handleClose={this.handleEditMissionModalClose} 
              mission={this.state.missionSelected}
            />
          </Modal>
        <div className="div-margin-sm">
          <h1>Mission List</h1>
          {this.props.charactersIsLoading ||
          this.props.missionsIsLoading ||
          this.props.transactionsIsLoading ? null : (
            <table className="width-100 table-highlights">
              <thead>
                <tr>
                  <th>Episode #</th>
                  <th>Name</th>
                  <th>Date Played</th>
                  <th>Mission Min/Max Level</th>
                  <th>DM</th>
                  <th>Characters</th>
                  <th>Transactions</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {this.props.missions
                  .sort((a, b) => (a.episode > b.episode ? -1 : 1))
                  .map((mission) => {
                    const dm = this.props.characters.find(
                      (character) => character.id === mission.dm
                    );
                    return (
                      <tr key={mission.id} className="mission-row">
                        <td>{mission.episode}</td>
                        <td>
                          <NavLink
                            to={`/missions/${mission.id}`}
                            activeClassName="is-active"
                          >
                            {mission.name}
                          </NavLink>
                        </td>
                        <td>{mission.playedOn}</td>
                        <td>
                          {`Min: ${mission.levelMin} Max: ${mission.levelMax}`}
                        </td>
                        <td>{`${dm.fullName}`}</td>
                        <td>
                          <ul className="character-list">
                            {mission.characters.map((pc) => {
                              const character = this.props.characters.find(
                                (character) => character.id === pc
                              );
                              return (
                                <li
                                  key={character.id}
                                >{`${character.fullName}`}</li>
                              );
                            })}
                          </ul>
                        </td>
                        <td>
                          {
                            this.props.transactions.filter(
                              (transaction) => transaction.mission === mission.id
                            ).length
                          }
                        </td>
                        <td>
                          {dm.creator === this.props.user.id ||
                          this.props.user.is_staff === true|| 
                          mission.creator === this.props.user.id ? 
                          <EditButton onClick={this.selectMission} objectToPass={mission} />
                          : null}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  startSetMissions: () => dispatch(startSetMissions()),
  startSetCharacters: () => dispatch(startSetCharacters()),
  startSetTransactions: () => dispatch(startSetTransactions()),
});

const mapStateToProps = (state, props) => ({
  missions: state.missions.data.filter((mission) => mission.visable === true),
  characters: state.characters.data,
  transactions: state.transactions.data,
  user: state.auth.user,

  missionsIsLoading: state.missions.isLoading,
  charactersIsLoading: state.characters.isLoading,
  transactionsIsLoading: state.transactions.isLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(MissionList);
