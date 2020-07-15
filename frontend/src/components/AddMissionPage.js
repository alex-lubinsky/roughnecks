import React from 'react';
import MissionForm from './MissionForm';
import Modal from 'react-bootstrap/Modal';
import { startAddMission } from '../actions/missions';
import { connect } from 'react-redux';


export const AddMissionPage = (props) => {

  return(
    <div>
      <Modal.Header closeButton>
        <Modal.Title>Create Mission</Modal.Title>
      </Modal.Header>
      <MissionForm
        onSubmit={mission => {
          props.startAddMission(mission)
          props.handleClose()
        }}
      />
    </div>
  )
}

const mapDispatchToProps = (dispatch, props) => ({
  startAddMission: (mission) => dispatch(startAddMission(mission)),
})

export default connect(undefined,mapDispatchToProps)(AddMissionPage);