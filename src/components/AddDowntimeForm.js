import React from "react";
import { connect } from "react-redux";
import { startAddDowntime } from "../actions/downtime";
import DowntimeForm from "./DowntimeForm";
import Modal from "react-bootstrap/Modal";

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
            downtimeType: formData.downtimeType,
            character: formData.character,
            numOfDaysSpent: formData.numOfDaysSpent,
          };

          props.startAddDowntime(downtime);
          props.handleClose();
        }}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch, props) => ({
  startAddDowntime: (downtime) => dispatch(startAddDowntime(downtime)),
});

export default connect(undefined, mapDispatchToProps)(AddDowntimeForm);
