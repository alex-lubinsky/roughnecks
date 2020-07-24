import React from "react";
import Select from "react-select";
import { startSetCharacters } from "../actions/characters";
import { connect } from "react-redux";
import ValidationMessage from "./ValidationMessage";
import { startSetMissions } from "../actions/missions";
import { startSetTransactions } from "../actions/transactions";
import { getDowntimeDays } from "../functions/levels";
import { startSetPCSubclasses } from "../actions/playercharacterclasses";

class DowntimeForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: "",
      descriptionValid: false,
      downtimeType: "",
      downtimeTypeValid: false,
      character: "",
      characterValid: false,
      numOfDaysSpent: 0,
      numOfDaysSpentValid: false,
      errorMsg: {},
      formValid: false,
      characterDowntime: 0,
      selectDowntimeTypeOptions: [
        { value: "TR", label: "Training Room" },
        { value: "MC", label: "Miscellaneous" },
      ],
    };
  }

  componentDidMount() {
    this.props.startSetCharacters();
    this.props.startSetMissions();
    this.props.startSetTransactions();
    this.props.startSetPCSubclasses();
  }

  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState({ description }, this.validateDescription);
  };

  validateDescription = () => {
    const { description } = this.state;
    let descriptionValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (description.length < 3) {
      descriptionValid = false;
      errorMsg.description = "Must be at least 3 characters long";
    }

    this.setState({ descriptionValid, errorMsg }, this.validateForm);
  };

  onNumOfDaysSpentChange = (e) => {
    const numOfDaysSpent = e.target.value;
    this.setState({ numOfDaysSpent }, this.validateNumOfDaysSpent);
  };

  validateNumOfDaysSpent = () => {
    const { numOfDaysSpent } = this.state;
    let numOfDaysSpentValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (!Number.isInteger(Number(numOfDaysSpent))) {
      numOfDaysSpentValid = false;
      errorMsg.numOfDaysSpent = "Must be a whole number";
    } else if (numOfDaysSpent < 1) {
      numOfDaysSpentValid = false;
      errorMsg.numOfDaysSpent = "Must be a number larger than 0";
    } else if (
      this.state.character !== "" &&
      numOfDaysSpent > this.state.characterDowntime
    ) {
      numOfDaysSpentValid = false;
      errorMsg.numOfDaysSpent = "Cannot spend more days than a character has";
    }

    this.setState({ numOfDaysSpentValid, errorMsg }, this.validateForm);
  };

  onDowntimeTypeChange = (selectedValue) => {
    const downtimeType = selectedValue;
    this.setState({ downtimeType }, this.validateDowntimeType);
  };

  validateDowntimeType = () => {
    const { downtimeType } = this.state;
    let downtimeTypeValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (downtimeType === "") {
      downtimeTypeValid = false;
      errorMsg.downtimeType = "Downtime spend must have a type";
    }

    this.setState({ downtimeTypeValid, errorMsg }, this.validateForm);
  };

  onCharacterChange = (selectedValue) => {
    const pcs = selectedValue;
    const character = this.props.characters.find(
      (character) => character.id === selectedValue.value
    );
    this.setState({
      characterDowntime: getDowntimeDays(
        this.props.missions.filter((mission) => mission.visable === true),
        character,
        this.props.transactions.filter((transaction) =>
          transaction.characters.some((pc) => pc.id === character.id)
        ),
        this.props.pcSubclasses.filter(
          (pcLevel) => pcLevel.classCharacter === character.id
        )
      ),
    });
    this.setState({ character: pcs }, this.validateCharacter);
  };

  validateCharacter = () => {
    const { character } = this.state;
    let characterValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (character === "") {
      characterValid = false;
      errorMsg.characters = "Downtime spend must have a character";
    }

    this.setState({ characterValid, errorMsg }, this.validateNumOfDaysSpent);
  };

  validateForm = () => {
    const {
      descriptionValid,
      downtimeTypeValid,
      characterValid,
      numOfDaysSpentValid,
    } = this.state;
    this.setState({
      formValid:
        descriptionValid &&
        downtimeTypeValid &&
        characterValid &&
        numOfDaysSpentValid,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit({
      description: this.state.description,
      downtimeType: this.state.downtimeType.value,
      character: this.state.character.value,
      numOfDaysSpent: this.state.numOfDaysSpent,
    });
  };

  selectCharacterOptions = this.props.characters.map((character) => {
    return {
      value: character.id,
      label: `${character.firstName} ${character.lastName}`,
    };
  });

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        {this.state.character !== "" ? (
          <div>
            {this.state.character.label} has {this.state.characterDowntime}{" "}
            downtime days available
          </div>
        ) : null}
        <label>Character</label>
        {this.props.missionsIsLoading || this.props.charactersIsLoading ? (
          <p>loading...</p>
        ) : (
          <Select
            options={this.selectCharacterOptions}
            value={this.state.character}
            onChange={this.onCharacterChange}
          />
        )}
        <ValidationMessage
          valid={this.state.characterValid}
          message={this.state.errorMsg.character}
        />
        <label className="inputlabel">Downtime Type</label>
        <Select
          options={this.state.selectDowntimeTypeOptions}
          value={this.state.downtimeType}
          onChange={this.onDowntimeTypeChange}
        />
        <ValidationMessage
          valid={this.state.downtimeTypeValid}
          message={this.state.errorMsg.downtimeType}
        />
        <label>Number of Days Spent</label>
        <input
          type="number"
          min="0"
          step="1"
          placeholder="Enter Number of Days Spent"
          value={this.state.numOfDaysSpent}
          onChange={this.onNumOfDaysSpentChange}
        />
        <ValidationMessage
          valid={this.state.numOfDaysSpentValid}
          message={this.state.errorMsg.numOfDaysSpent}
        />
        <label>Description</label>
        <input
          type="text"
          placeholder="Enter Description"
          value={this.state.description}
          onChange={this.onDescriptionChange}
        />
        <ValidationMessage
          valid={this.state.descriptionValid}
          message={this.state.errorMsg.description}
        />
        <div>
          Description:{" "}
          {this.state.descriptionValid ? (
            <i className="valid-input icon-ok-circle" />
          ) : (
            <i className="invalid-input icon-remove-sign" />
          )}
        </div>
        <div>
          Downtime Type:{" "}
          {this.state.downtimeTypeValid ? (
            <i className="valid-input icon-ok-circle" />
          ) : (
            <i className="invalid-input icon-remove-sign" />
          )}
        </div>
        <div>
          Character:{" "}
          {this.state.characterValid ? (
            <i className="valid-input icon-ok-circle" />
          ) : (
            <i className="invalid-input icon-remove-sign" />
          )}
        </div>
        <div>
          Number of Downtime Days:{" "}
          {this.state.numOfDaysSpentValid ? (
            <i className="valid-input icon-ok-circle" />
          ) : (
            <i className="invalid-input icon-remove-sign" />
          )}
        </div>
        <div>
          <button
            disabled={!this.state.formValid}
            type="submit"
            variant="primary"
          >
            Add Downtime
          </button>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  startSetCharacters: () => dispatch(startSetCharacters()),
  startSetMissions: () => dispatch(startSetMissions()),
  startSetTransactions: () => dispatch(startSetTransactions()),
  startSetPCSubclasses: () => dispatch(startSetPCSubclasses()),
});

const mapStateToProps = (state, props) => ({
  characters: state.characters.data.filter(
    (character) => character.creator === state.auth.user.id && !character.dead
  ),
  characterarray: state.characters.data,
  userid: state.auth.user.id,
  missions: state.missions.data,
  transactions: state.transactions.data,
  pcSubclasses: state.pcSubclasses.data,

  missionsIsLoading: state.missions.isLoading,
  charactersIsLoading: state.characters.isLoading,
  transactionsIsLoading: state.transactions.isLoading,
  pcSubclassesIsLoading: state.pcSubclasses.isLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(DowntimeForm);
