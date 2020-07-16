import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import { startAddDowntime } from '../actions/downtime';
import DowntimeForm from './DowntimeForm';

const AddDowntimeForm = (props) => {
  
  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title>{`Add Downtime Spend`}</Modal.Title>
      </Modal.Header>
      <DowntimeForm 
        onSubmit={formData => {

          const downtime = {
            description: formData.description,
            downtimeType: formData.downtimeType,
            character: formData.character,
            numOfDaysSpent: formData.numOfDaysSpent
          }
          
          props.startAddDowntime(downtime)
          props.handleClose()

        }}
      />
    </div>
  )  
}

const mapDispatchToProps = (dispatch, props) => ({
  startAddDowntime: (downtime) => dispatch(startAddDowntime(downtime)),
})

export default connect(undefined,mapDispatchToProps)(AddDowntimeForm);