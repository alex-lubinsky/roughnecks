import React from "react";
import MissionForm from "./MissionForm";
import { startUpdateMission } from "../actions/missions";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";


export const EditMissionForm = (props) => {

  const dm = props.characters.find(character => character.id === props.mission.dm)
  const pcs = props.mission.characters.map(character => {
    const fullName = props.characters.find(pc => pc.id === character).fullName
    return {value: character, label: fullName}
  })

  return (
    <div>
      <Modal.Header closeButton>
        <h1>Edit {props.mission.name}</h1>
      </Modal.Header>
      <MissionForm
        mission={props.mission}
        editForm={true}
        dm={{value: dm.id, label: dm.fullName}}
        pcs={pcs}
        onSubmit={(missionUpdates) => {
          props.startUpdateMission(props.mission.id, missionUpdates);
          props.handleClose();
        }}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch, props) => ({
  startUpdateMission: (id, updates) => dispatch(startUpdateMission(id, updates)),
});

const mapStateToProps = (state, props) => ({
  characters: state.characters.data
});

export default connect(mapStateToProps, mapDispatchToProps)(EditMissionForm);