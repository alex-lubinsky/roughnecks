import React from 'react';
import TransactionForm from './TransactionForm';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import { startaddTransaction } from '../actions/transactions';

const AddTransactionPage = (props) => {

  return(
  <div>
    <Modal.Header closeButton>
        <Modal.Title>Create Transaction</Modal.Title>
      </Modal.Header>
    <TransactionForm 
      onSubmit={transaction => {
        
        props.startaddTransaction(transaction)
        props.handleClose()
      }}
    />
  </div>
  )
}

const mapDispatchToProps = (dispatch, props) => ({
  startaddTransaction: (transaction) => dispatch(startaddTransaction(transaction)),
})

export default connect(undefined, mapDispatchToProps)(AddTransactionPage);