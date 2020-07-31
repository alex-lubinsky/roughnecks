import React from "react";
import TransactionForm from "./TransactionForm";
import { connect } from "react-redux";
import { startaddTransaction } from "../actions/transactions";
import Modal from 'react-bootstrap/Modal';

const AddTransactionPage = (props) => {
  return (
    <div>
      <Modal.Header closeButton>
        <h1>Create Transaction</h1>
      </Modal.Header>
      <TransactionForm
        onSubmit={(transaction) => {
          props.startaddTransaction(transaction);
          props.handleClose();
        }}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch, props) => ({
  startaddTransaction: (transaction) =>
    dispatch(startaddTransaction(transaction)),
});

export default connect(undefined, mapDispatchToProps)(AddTransactionPage);
