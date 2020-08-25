import React from "react";
import { connect } from "react-redux";
import { startSetTransactions } from "../actions/transactions";
import TransactionsTable from "./TransactionsTable";
import { startSetCharacters } from "../actions/characters";
import { startSetMissions } from "../actions/missions";
import Modal from 'react-bootstrap/Modal'
import EditTransactionForm from './EditTransactionForm';
import DeleteTransactionForm from "./DeleteTransactionForm";

class TransactionList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showEditTransactionModal: false,
      showDeleteTransactionModal: false,
      editDelete: '',
      transactionSelected: '',
    }
  }
  
  componentDidMount() {
    this.props.startSetTransactions();
    this.props.startSetCharacters();
    this.props.startSetMissions();
  }

  onClick = (transaction, eD) => {
    this.setState({ editDelete: eD, transactionSelected: transaction }, this.handleModalOpen)
  }

  handleModalOpen = () => {
    if (this.state.transactionSelected !== '' && this.state.editDelete === 'Delete') {
      this.handleDeleteTransactionModalOpen()
    } else if (this.state.transactionSelected !== '' && this.state.editDelete === 'Edit') {
      this.handleEditTransactionModalOpen()
    }
  }

  handleEditTransactionModalOpen = () => {
    this.setState({showEditTransactionModal: true})
  };

  handleEditTransactionModalClose = () => {
    this.setState({showEditTransactionModal: false})
  };

  handleDeleteTransactionModalOpen = () => {
    this.setState({showDeleteTransactionModal: true})
  };

  handleDeleteTransactionModalClose = () => {
    this.setState({showDeleteTransactionModal: false})
  };

  render() {
    return (
      <>
        <Modal show={this.state.showEditTransactionModal}
          onHide={this.handleEditTransactionModalClose}>
          <EditTransactionForm 
            transaction={this.state.transactionSelected} 
            handleClose={this.handleEditTransactionModalClose} 
          />
        </Modal>

        <Modal show={this.state.showDeleteTransactionModal}
          onHide={this.handleDeleteTransactionModalClose}>
          <DeleteTransactionForm
            transaction={this.state.transactionSelected} 
            handleClose={this.handleDeleteTransactionModalClose}
          />
        </Modal>

        <div className="div-margin-sm">
          {this.props.transactionsIsLoading ||
          this.props.charactersIsLoading ||
          this.props.transactionsIsLoading ? <div>Loading...</div> : (
            <TransactionsTable
              transactions={this.props.transactions}
              characters={this.props.characters}
              missions={this.props.missions}
              user={this.props.user}
              onClick={this.onClick}
            />
          )}
        </div>
      </>
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
