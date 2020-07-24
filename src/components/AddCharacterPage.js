import React from "react";
import CharacterForm from "./CharacterForm";
import { startAddCharacter } from "../actions/characters";
import { connect } from "react-redux";
import { startAddPcSubclass } from "../actions/playercharacterclasses";
import { startaddTransaction } from "../actions/transactions";

const AddCharacterPage = (props) => {
  return (
    <div>
      <h1>Create Player Character</h1>
      <CharacterForm
        onSubmit={(formData) => {
          const character = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            raceName: formData.raceName,
            armorClass: formData.armorClass,
            passivePerception: formData.passivePerception,
            maxHp: formData.maxHp,
            creator: props.userId,
            altVision: formData.altVision,
          };

          const date = new Date();
          props.startAddCharacter(character).then((res) => {
            const subclassData = {
              playerClass: formData.subclassName,
              classCharacter: res.id,
              dateCreated: `${date.getFullYear()}-${
                date.getMonth() + 1
              }-${date.getDate()}`,
            };
            props.startAddPcSubclass(subclassData);
            const startingGoldTransaction = {
              name: "Starting Gold",
              goldPcs: formData.goldPcs,
              silverPcs: 0,
              copperPcs: 0,
              mission: props.startingGoldMissionId,
              characters: [res.id],
              airshipPot: false,
              earnedSpent: 1,
            };
            props.startaddTransaction(startingGoldTransaction);
          });
          props.handleClose();
        }}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch, props) => ({
  startAddCharacter: (character) => dispatch(startAddCharacter(character)),
  startAddPcSubclass: (subclass) => dispatch(startAddPcSubclass(subclass)),
  startaddTransaction: (transaction) =>
    dispatch(startaddTransaction(transaction)),
});

const mapStateToProps = (state, props) => ({
  userId: state.auth.user.id,
  startingGoldMissionId: state.missions.data.find(
    (mission) => mission.name === "Starting Gold"
  ).id,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCharacterPage);
