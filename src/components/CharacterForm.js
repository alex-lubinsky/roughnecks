import React from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { startSetRaces } from "../actions/races";
import { startSetSubclasses } from "../actions/subclasses";
import ClassForm from "./ClassForm";
import ValidationMessage from "./ValidationMessage";

class CharacterForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      fistNameValid: false,
      lastName: "",
      raceName: "",
      raceNameValid: false,
      armorClass: 1,
      armorClassValid: true,
      passivePerception: 1,
      passivePerceptionValid: true,
      maxHp: 1,
      maxHpValid: true,
      gold: 0,
      goldValid: false,
      subclassName: "",
      subclassNameValid: false,
      altVision: "",
      altVisionValid: false,
      errorMsg: {},
      formValid: false,
    };
  }

  componentDidMount() {
    this.props.startSetRaces();
    this.props.startSetSubclasses();
  }

  onFirstNameChange = (e) => {
    const firstName = e.target.value;
    this.setState({ firstName }, this.validateFirstName);
  };

  validateFirstName = () => {
    const { firstName } = this.state;
    let firstNameValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (firstName.length < 3) {
      firstNameValid = false;
      errorMsg.firstName = "Must be at least 3 characters long";
    }

    this.setState({ firstNameValid, errorMsg }, this.validateForm);
  };

  onLastNameChange = (e) => {
    const lastName = e.target.value;
    this.setState({ lastName });
  };

  onArmorClassChange = (e) => {
    const armorClass = e.target.value;
    this.setState({ armorClass }, this.validateArmorClass);
  };

  validateArmorClass = () => {
    const { armorClass } = this.state;
    let armorClassValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (!Number.isInteger(Number(armorClass))) {
      armorClassValid = false;
      errorMsg.armorClass = "Must be a whole number";
    } else if (armorClass < 1) {
      armorClassValid = false;
      errorMsg.armorClass = "Must be a number larger than 0";
    }
    this.setState({ armorClassValid, errorMsg }, this.validateForm);
  };

  onPassivePerceptionChange = (e) => {
    const passivePerception = e.target.value;
    this.setState({ passivePerception }, this.validatePassivePerception);
  };

  validatePassivePerception = () => {
    const { passivePerception } = this.state;
    let passivePerceptionValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (!Number.isInteger(Number(passivePerception))) {
      passivePerceptionValid = false;
      errorMsg.passivePerception = "Must be a whole number";
    } else if (passivePerception < 1) {
      passivePerceptionValid = false;
      errorMsg.passivePerception = "Must be a number larger than 0";
    }

    this.setState({ passivePerceptionValid, errorMsg }, this.validateForm);
  };

  onMaxHpChange = (e) => {
    const maxHp = e.target.value;
    this.setState({ maxHp }, this.validateMaxHp);
  };

  validateMaxHp = () => {
    const { maxHp } = this.state;
    let maxHpValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (!Number.isInteger(Number(maxHp))) {
      maxHpValid = false;
      errorMsg.maxHp = "Must be a whole number";
    } else if (maxHp < 1) {
      maxHpValid = false;
      errorMsg.maxHp = "Must be a number larger than 0";
    }

    this.setState({ maxHpValid, errorMsg }, this.validateForm);
  };

  onGoldPcsChange = (e) => {
    const gold = e.target.value;
    this.setState({ gold }, this.validateGold);
  };

  validateGold = () => {
    const { gold } = this.state;
    let goldValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (!Number.isInteger(Number(gold))) {
      goldValid = false;
      errorMsg.gold = "Must be a whole number";
    } else if (gold < 0) {
      goldValid = false;
      errorMsg.gold = "Must be a number larger than 0";
    }

    this.setState({ goldValid, errorMsg }, this.validateForm);
  };

  onVisionChange = (selectedItem) => {
    this.setState({ altVision: selectedItem.value }, this.validateAltVision);
  };

  validateAltVision = () => {
    const { altVision } = this.state;
    let altVisionValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (altVision === "") {
      altVisionValid = false;
      errorMsg.altVision = "Select a Vision Type";
    }

    this.setState({ altVisionValid, errorMsg }, this.validateForm);
  };

  getRaceOptions = () => {
    return this.props.races
      .sort((a, b) => (a.raceName > b.raceName ? 1 : -1))
      .map((race) => {
        return { value: race.id, label: race.raceName };
      });
  };

  onRaceChange = (selectedItem) => {
    this.setState({ raceName: selectedItem.value }, this.validateRaceName);
  };

  validateRaceName = () => {
    const { raceName } = this.state;
    let raceNameValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (raceName === "") {
      raceNameValid = false;
      errorMsg.raceName = "Select a Character Race";
    }

    this.setState({ raceNameValid, errorMsg }, this.validateForm);
  };

  onClassFormChange = (subclass) => {
    this.setState(
      {
        subclassName: subclass.subclassName,
        subclassNameValid: subclass.subclassValid,
      },
      this.validateForm
    );
  };

  validateForm = () => {
    const {
      firstNameValid,
      armorClassValid,
      raceNameValid,
      passivePerceptionValid,
      maxHpValid,
      subclassNameValid,
      goldValid,
      altVisionValid,
    } = this.state;
    this.setState({
      formValid:
        firstNameValid &&
        armorClassValid &&
        raceNameValid &&
        passivePerceptionValid &&
        maxHpValid &&
        subclassNameValid &&
        goldValid &&
        altVisionValid,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      raceName: this.state.raceName,
      armorClass: this.state.armorClass,
      passivePerception: this.state.passivePerception,
      maxHp: this.state.maxHp,
      subclassName: this.state.subclassName,
      goldPcs: this.state.gold,
      altVision: this.state.altVision,
    });
  };

  render() {
    const altVisionChoices = [
      { value: "NORM", label: "Normal Vision" },
      { value: "60DV", label: "60 ft Dark Vision" },
    ];

    return (
      <form onSubmit={this.onSubmit}>
        <label>First Name</label>
        <input
          type="text"
          value={this.state.firstName}
          onChange={this.onFirstNameChange}
          placeholder="Enter Character's First Name"
        />
        <ValidationMessage
          valid={this.state.firstNameValid}
          message={this.state.errorMsg.firstName}
        />
        <label>Last Name</label>
        <input
          type="text"
          value={this.state.lastName}
          onChange={this.onLastNameChange}
          placeholder="Enter Character's Last Name"
        />

        <label>Armor Class</label>
        <input
          type="number"
          min="0"
          step="1"
          value={this.state.armorClass}
          onChange={this.onArmorClassChange}
          placeholder="Enter Character's Armor Class"
        />
        <ValidationMessage
          valid={this.state.armorClassValid}
          message={this.state.errorMsg.armorClass}
        />
        <label>Passive Perception</label>
        <input
          type="number"
          min="0"
          step="1"
          value={this.state.passivePerception}
          onChange={this.onPassivePerceptionChange}
          placeholder="Enter Character's Passive Perception"
        />
        <ValidationMessage
          valid={this.state.passivePerceptionValid}
          message={this.state.errorMsg.passivePerception}
        />
        <label>Max HP</label>
        <input
          type="number"
          min="0"
          step="1"
          value={this.state.maxHp}
          onChange={this.onMaxHpChange}
          placeholder="Enter Character's Max HP"
        />
        <ValidationMessage
          valid={this.state.maxHpValid}
          message={this.state.errorMsg.maxHp}
        />
        <label>Vision</label>
        <Select options={altVisionChoices} onChange={this.onVisionChange} />
        <ValidationMessage
          valid={this.state.altVisionValid}
          message={this.state.errorMsg.altVision}
        />

        <label>Starting Gold</label>
        <input
          type="number"
          min="0"
          step="1"
          value={this.state.gold}
          onChange={this.onGoldPcsChange}
          placeholder="Enter Character's Starting Gold"
        />
        <ValidationMessage
          valid={this.state.goldValid}
          message={this.state.errorMsg.gold}
        />

        <label>Race</label>
        {this.props.racesIsLoading ? (
          <p>loading races....</p>
        ) : (
          <Select
            options={this.getRaceOptions()}
            onChange={this.onRaceChange}
          />
        )}
        <ValidationMessage
          valid={this.state.raceNameValid}
          message={this.state.errorMsg.raceName}
        />

        {this.props.subclassesIsLoading ? (
          <p>loading subclasses....</p>
        ) : (
          <ClassForm
            subclasses={this.props.subclasses}
            onChange={this.onClassFormChange}
          />
        )}
        <div>
          First Name:{" "}
          {this.state.firstNameValid ? (
            <i className="valid-input icon-ok-circle" />
          ) : (
            <i className="invalid-input icon-remove-sign" />
          )}
        </div>
        <div>
          Last Name is Optional: <i className="valid-input icon-ok-circle" />
        </div>
        <div>
          Armor Class:{" "}
          {this.state.armorClassValid ? (
            <i className="valid-input icon-ok-circle" />
          ) : (
            <i className="invalid-input icon-remove-sign" />
          )}
        </div>
        <div>
          Passive Perception:{" "}
          {this.state.passivePerceptionValid ? (
            <i className="valid-input icon-ok-circle" />
          ) : (
            <i className="invalid-input icon-remove-sign" />
          )}
        </div>
        <div>
          Max HP:{" "}
          {this.state.maxHpValid ? (
            <i className="valid-input icon-ok-circle" />
          ) : (
            <i className="invalid-input icon-remove-sign" />
          )}
        </div>
        <div>
          Vision:{" "}
          {this.state.altVisionValid ? (
            <i className="valid-input icon-ok-circle" />
          ) : (
            <i className="invalid-input icon-remove-sign" />
          )}
        </div>
        <div>
          Starting Gold:{" "}
          {this.state.goldValid ? (
            <i className="valid-input icon-ok-circle" />
          ) : (
            <i className="invalid-input icon-remove-sign" />
          )}
        </div>
        <div>
          Race:{" "}
          {this.state.raceNameValid ? (
            <i className="valid-input icon-ok-circle" />
          ) : (
            <i className="invalid-input icon-remove-sign" />
          )}
        </div>
        <div>
          Class:{" "}
          {this.state.subclassNameValid ? (
            <i className="valid-input icon-ok-circle" />
          ) : (
            <i className="invalid-input icon-remove-sign" />
          )}
        </div>
        <button
          variant="primary"
          disabled={!this.state.formValid}
          type="submit"
        >
          Add Character
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  startSetRaces: () => dispatch(startSetRaces()),
  startSetSubclasses: () => dispatch(startSetSubclasses()),
});

const mapStateToProps = (state, props) => ({
  races: state.races.data,
  subclasses: state.subclasses.data,
  racesIsLoading: state.races.isLoading,
  subclassesIsLoading: state.subclasses.isLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(CharacterForm);
