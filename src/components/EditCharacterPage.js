import React from "react";
import CharacterForm from "./CharacterForm";
import { startUpdateCharacter } from "../actions/characters";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";

const EditCharacterPage = (props) => {

  const raceName = props.races.find(race => {
    return race.id === props.character.raceName
  })
  const altVision = props.character.altVision === "NORM" ? { value: "NORM", label: "Normal Vision" } : { value: "60DV", label: "60 ft Dark Vision" }

  return (
    <div>
      <Modal.Header closeButton>
        <h1>Edit {props.character.fullName}</h1>
      </Modal.Header>
      <CharacterForm
        character={props.character}
        editForm = {true}
        altVision = {altVision}
        raceName = {{value: raceName.id, label: raceName.raceName}}
        onSubmit={(formData) => {
          const character = {
            fullName: formData.fullName,
            raceName: formData.raceName,
            armorClass: formData.armorClass,
            passivePerception: formData.passivePerception,
            maxHp: formData.maxHp,
            altVision: formData.altVision,
          };

          props.startUpdateCharacter(props.character.id, character);

          props.handleClose();
        }}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch, props) => ({
  startUpdateCharacter: (id, updates) => dispatch(startUpdateCharacter(id, updates))
});

const mapStateToProps = (state, props) => ({
  races: state.races.data
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCharacterPage);
