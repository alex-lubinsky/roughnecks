import React from 'react';
import LevelUpForm from './LevelUpForm';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import { startUpdateCharacter } from '../actions/characters';
import { startAddPcSubclass } from '../actions/playercharacterclasses';

const AddLevelForm = (props) => {
  
  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title>{` Add Level for ${props.character.firstName}`}</Modal.Title>
      </Modal.Header>
      
      <LevelUpForm 
        character={props.character}
        subclasses={props.subclasses}
        pcSubclasses={props.pcSubclasses}
        onSubmit={formData => {
          
          const characterUpdate = {
            passivePerception: formData.passivePerception,
            maxHp: formData.maxHp
          }

          const playerCharacterLevel = {
            playerClass: formData.subclassName,
            classCharacter: props.character.id
          }

          props.startUpdateCharacter(props.character.id, characterUpdate)
          props.startAddPcSubclass(playerCharacterLevel)
          props.handleClose()

        }}
      />
    </div>
  )  
}

const mapDispatchToProps = (dispatch, props) => ({
  startUpdateCharacter: (update) => dispatch(startUpdateCharacter(update)),
  startAddPcSubclass: (subclass) => dispatch(startAddPcSubclass(subclass)),
})

export default connect(undefined,mapDispatchToProps)(AddLevelForm);