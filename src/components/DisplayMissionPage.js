import React from "react";
import { connect } from "react-redux";
import { startSetMissions } from "../actions/missions";
import TransactionsTable from "./TransactionsTable";
import { startSetCharacters } from "../actions/characters";
import { startSetTransactions } from "../actions/transactions";
// import Button from 'react-bootstrap/Button'
// import Modal from "react-bootstrap/Modal";

class DisplayMissionPage extends React.Component {
  
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     showItemModal:false
  //   };
  // }
  
  componentDidMount() {
    this.props.startSetMissions();
    this.props.startSetCharacters();
    this.props.startSetTransactions();
  }

  // handleItemModalClose =() => {
  //   this.setState({showItemModal: false})
  // }

  // handleItemModalOpen =() => {
  //   this.setState({showItemModal: true})
  // }

  // onGiveItemClick = () => {

  // }

  render() {
    const dm = this.props.characters.find(
      (character) => character.id === this.props.mission.dm
    );

    return (
      <>
        {/* <Modal show={this.state.showItemModal}  onHide={this.handleItemModalClose}>
          <Modal.Header closeButton>
            <h1>Give a PC an Item</h1>
          </Modal.Header>
          <Modal.Body>
          
          </Modal.Body>
          <Modal.Footer>
            <Button>Give Item</Button>
          </Modal.Footer>
        </Modal> */}

        <div className="div-margin-sm">
          {this.props.transactionsIsLoading ||
          this.props.missionsIsLoading ||
          this.props.charactersIsLoading ? null : (
            <div>
              <h1>{`Episode ${this.props.mission.episode}: ${this.props.mission.name}`}</h1>
              {/* <span>
                {dm.creator === this.props.user.id || this.props.user.is_staff === true ? 
                  <Button onClick={this.handleItemModalOpen}>Give PC an Item</Button> : null}
              </span> */}
              <p>Played on: {this.props.mission.playedOn}</p>
              <p>
                DM: {dm.firstName} {dm.lastName}
              </p>
              Players:{" "}
              <ul>
              {this.props.mission.characters.map((pc) => {
                const character = this.props.characters.find(
                  (character) => character.id === pc
                );
                return <li key={character.id}>{`${character.firstName} ${character.lastName}`}</li>;
              })}
              </ul>
              <TransactionsTable
                transactions={this.props.transactions.filter(
                  (transaction) => transaction.mission === this.props.mission.id
                )}
                characters={this.props.characters}
                missions={this.props.missions}
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
