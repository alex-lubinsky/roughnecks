import React from "react";
import TransactionForm from "./TransactionForm";
import { connect } from "react-redux";
import { startAddTransaction } from "../actions/transactions";
import Modal from "react-bootstrap/Modal";

const AddTransactionPage = (props) => {
  return (
    <div>
      <Modal.Header closeButton>
        <h1>Create Transaction</h1>
      </Modal.Header>
      <TransactionForm
        onSubmit={(transaction) => {
          props.startAddTransaction({...transaction, creator: props.userId});
          props.handleClose();
        }}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch, props) => ({
  startAddTransaction: (transaction) =>
    dispatch(startAddTransaction(transaction)),
});

const mapStateToProps = (state, props) => ({
  userId: state.auth.user.id
})

export default connect(mapStateToProps, mapDispatchToProps)(AddTransactionPage);
