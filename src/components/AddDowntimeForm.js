import React from "react";
import { connect } from "react-redux";
import { startAddDowntime } from "../actions/downtime";
import DowntimeForm from "./DowntimeForm";
import Modal from "react-bootstrap/Modal";
import { startAddTransaction } from '../actions/transactions';
import { THE_JOB_BOARD } from '../variables/downtimejobvariables'

const AddDowntimeForm = (props) => {

  return (
    <div>
      <Modal.Header closeButton>
        <h1>{`Add Downtime Spend`}</h1>
      </Modal.Header>
      <DowntimeForm
        onSubmit={(formData) => {
          const downtime = {
            description: formData.description,
            downtimeType: formData.downtimeType.value,
            character: formData.character,
            numOfDaysSpent: formData.numOfDaysSpent,
          };
          props.startAddDowntime(downtime);

          if (formData.downtimeType.value === THE_JOB_BOARD) {
            const transaction = {
              name: formData.downtimeJob.label,
              mission: formData.mission,
              characters: [formData.character],
              goldPcs: formData.transactionAmount,
              silverPcs: 0,
              copperPcs: 0,
              airshipPot: false,
              earnedSpent: 1,
            }
            props.startAddTransaction(transaction);
          }
          props.handleClose();
        }}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch, props) => ({
  startAddDowntime: (downtime) => dispatch(startAddDowntime(downtime)),
  startAddTransaction: (transaction) => dispatch(startAddTransaction(transaction)),
});

export default connect(undefined, mapDispatchToProps)(AddDowntimeForm);
