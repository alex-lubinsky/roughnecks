import React from "react";
import { connect } from "react-redux";
import { startSetTransactions } from "../actions/transactions";
import TransactionsTable from "./TransactionsTable";
import { startSetCharacters } from "../actions/characters";
import { startSetMissions } from "../actions/missions";

class TransactionList extends React.Component {
  
  componentDidMount() {
    this.props.startSetTransactions();
    this.props.startSetCharacters();
    this.props.startSetMissions();
  }

  render() {
    return (
      <div className="div-margin-sm">
        {this.props.transactionsIsLoading ||
        this.props.charactersIsLoading ||
        this.props.transactionsIsLoading ? <div>Loading...</div> : (
          <TransactionsTable
            transactions={this.props.transactions}
            characters={this.props.characters}
            missions={this.props.missions}
            user={this.props.user}
          />
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  startSetTransactions: () => dispatch(startSetTransactions()),
  startSetCharacters: () => dispatch(startSetCharacters()),
  startSetMissions: () => dispatch(startSetMissions()),
});

const mapStateToProps = (state, props) => ({
  transactions: state.transactions.data,
  characters: state.characters.data,
  missions: state.missions.data,
  user: state.auth.user,

  transactionsIsLoading: state.transactions.isLoading,
  charactersIsLoading: state.characters.isLoading,
  missionsIsLoading: state.missions.isLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionList);
