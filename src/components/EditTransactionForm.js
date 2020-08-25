import React from "react";
import TransactionForm from "./TransactionForm";
import { connect } from "react-redux";
import { startUpdateTransaction } from "../actions/transactions";
import Modal from "react-bootstrap/Modal";

const EditTransactionForm = (props) => {

  const earnedSpent = props.transaction.earnedSpent === 1 ? { label: "Earned", value: "Earned" } : { value: "Spent", label: "Spent" };
  const airshipPotDiabled = props.transaction.earnedSpent === -1 ? true : false;

  const pcs = props.transaction.characters.map(character => {
    const pc = props.characters.find(pc => pc.id === character)
    return {value: pc.id, label: pc.fullName}
  })
  
  const mission = {value: props.transaction.mission, label: props.missions.find(mission => mission.id === props.transaction.mission).name}
  

  return (
    <div>
      <Modal.Header closeButton>
        <h1>Edit Transaction</h1>
      </Modal.Header>
      <TransactionForm
        transaction={props.transaction}
        earnedSpent={earnedSpent}
        airshipPotDiabled={airshipPotDiabled}
        mission={mission}
        pcs={pcs}
        editForm={true}
        onSubmit={(transaction) => {
          props.startUpdateTransaction(props.transaction.id, transaction)
          props.handleClose();
        }}
      />
    </div>
  );
};


const mapDispatchToProps = (dispatch, props) => ({
  startUpdateTransaction: (id, update) => dispatch(startUpdateTransaction(id, update)),
});

const mapStatetoProps = (state, props) => ({
  missions: state.missions.data,
  characters: state.characters.data
});

export default connect(mapStatetoProps, mapDispatchToProps)(EditTransactionForm);