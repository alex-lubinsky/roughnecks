import React from "react";
import MissionForm from "./MissionForm";
import { startAddMission } from "../actions/missions";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";

export const AddMissionPage = (props) => {
  return (
    <div>
      <Modal.Header closeButton>
        <h1>Create Mission</h1>
      </Modal.Header>
      <MissionForm
        onSubmit={(mission) => {
          props.startAddMission(mission);
          props.handleClose();
        }}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch, props) => ({
  startAddMission: (mission) => dispatch(startAddMission(mission)),
});

export default connect(undefined, mapDispatchToProps)(AddMissionPage);
