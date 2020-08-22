import React from "react";
import { connect } from "react-redux";
import { startSetMissions } from "../actions/missions";
import TransactionsTable from "./TransactionsTable";
import { startSetCharacters } from "../actions/characters";
import { startSetTransactions } from "../actions/transactions";
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
import { BsPencil } from 'react-icons/bs';
import EditMissionForm from './EditMissionForm';

class DisplayMissionPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showUpdateMissionModal: false
    };
  }

  componentDidMount() {
    this.props.startSetMissions();
    this.props.startSetCharacters();
    this.props.startSetTransactions();
  }

  handleUpdateMissionModalOpen = () => {
    this.setState({showUpdateMissionModal: true })
  };

  handleUpdateMissionModalClose = () => {
    this.setState({showUpdateMissionModal: false })
  };

  render() {
    const dm = this.props.characters.find(
      (character) => character.id === this.props.mission.dm
    );

    return (
      <>

        <Modal
          show={this.state.showUpdateMissionModal}
          onHide={this.handleUpdateMissionModalClose}
        >
          <EditMissionForm mission={this.props.mission} handleClose={this.handleUpdateMissionModalClose}/>
        </Modal>


        <div className="div-margin-sm">
          {this.props.transactionsIsLoading ||
          this.props.missionsIsLoading ||
          this.props.charactersIsLoading ? null : (
            <div>
              <h1>{`Episode ${this.props.mission.episode}: ${this.props.mission.name}`}</h1>
              <span>
                {dm.creator === this.props.user.id || this.props.user.is_staff === true || this.props.mission.creator === this.props.user.id ? 
                  <Button variant="link" onClick={this.handleUpdateMissionModalOpen}><BsPencil /></Button> : null}
              </span>
              <p>Played on: {this.props.mission.playedOn}</p>
              <p>DM: {dm.fullName}</p>
              Players:{" "}
              <ul>
                {this.props.mission.characters.map((pc) => {
                  const character = this.props.characters.find(
                    (character) => character.id === pc
                  );
                  return <li key={character.id}>{`${character.fullName}`}</li>;
                })}
              </ul>
              <TransactionsTable
                transactions={this.props.transactions.filter(
                  (transaction) => transaction.mission === this.props.mission.id
                )}
                characters={this.props.characters}
                missions={this.props.missions}
                user={this.props.user}
              />
            </div>
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
  mission: state.missions.data.find(
    (mission) => mission.id.toString() === props.match.params.id
  ),
  missions: state.missions.data,
  characters: state.characters.data,
  transactions: state.transactions.data,
  user: state.auth.user,

  missionsIsLoading: state.missions.isLoading,
  charactersIsLoading: state.characters.isLoading,
  transactionsIsLoading: state.transactions.isLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(DisplayMissionPage);
