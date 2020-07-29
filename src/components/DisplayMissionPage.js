import React from "react";
import { connect } from "react-redux";
import { startSetMissions } from "../actions/missions";
import TransactionsTable from "./TransactionsTable";
import { startSetCharacters } from "../actions/characters";
import { startSetTransactions } from "../actions/transactions";

class DisplayMissionPage extends React.Component {
  componentDidMount() {
    this.props.startSetMissions();
    this.props.startSetCharacters();
    this.props.startSetTransactions();
  }

  render() {
    const dm = this.props.characters.find(
      (character) => character.id === this.props.mission.dm
    );
    return (
      <div className="div-margin-sm">
        {this.props.transactionsIsLoading ||
        this.props.missionsIsLoading ||
        this.props.charactersIsLoading ? null : (
          <div>
            <h1>{`Episode ${this.props.mission.episode}: ${this.props.mission.name}`}</h1>
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
  missionsIsLoading: state.missions.isLoading,
  charactersIsLoading: state.characters.isLoading,
  transactionsIsLoading: state.transactions.isLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(DisplayMissionPage);
