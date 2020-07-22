import React from "react";
import { connect } from "react-redux";
import { startSetTransactions } from "../actions/transactions";
import TransactionsTable from "./TransactionsTable";
import { startSetCharacters } from "../actions/characters";

class TransactionList extends React.Component {
  componentDidMount() {
    this.props.startSetTransactions();
    this.props.startSetCharacters();
  }

  render() {
    return (
      <div>
        {this.props.transactionsIsLoading ||
        this.props.charactersIsLoading ? null : (
          <TransactionsTable
            transactions={this.props.transactions}
            characters={this.props.characters}
          />
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  startSetTransactions: () => dispatch(startSetTransactions()),
  startSetCharacters: () => dispatch(startSetCharacters()),
});

const mapStateToProps = (state, props) => ({
  transactions: state.transactions.data,
  characters: state.characters.data,
  transactionsIsLoading: state.transactions.isLoading,
  charactersIsLoading: state.characters.isLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionList);
