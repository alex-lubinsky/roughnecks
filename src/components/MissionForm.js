import React from "react";
import Select from "react-select";
import { startSetCharacters } from "../actions/characters";
import { connect } from "react-redux";
import ValidationMessage from "./ValidationMessage";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { startSetMissions } from "../actions/missions";

class MissionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      nameValid: false,
      dm: "",
      dmValid: false,
      characters: [],
      charactersValid: false,
      filteredCharacters: this.props.characters,
      minLevel: 1,
      minLevelValid: true,
      maxLevel: 1,
      maxLevelValid: false,
      errorMsg: {},
      formValid: false,
      startDate: new Date(),
      startDateValid: true,
    };
  }

  componentDidMount() {
    this.props.startSetCharacters();
    this.props.startSetMissions();
  }

  onNameChange = (e) => {
    const name = e.target.value;
    this.setState({ name }, this.validateName);
  };

  validateName = () => {
    const { name } = this.state;
    let nameValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (name.length < 3) {
      nameValid = false;
      errorMsg.name = "Must be at least 3 characters long";
    }

    this.setState({ nameValid, errorMsg }, this.validateForm);
  };

  onDmChange = (selectedValues) => {
    const dm = selectedValues.value;
    this.setState({ dm }, this.validateDm);

    const filteredCharacters = this.props.characters.filter((character) => {
      return character.id !== dm;
    });
    this.setState({ filteredCharacters });

    if (this.state.characters.length > 0) {
      const pcs = this.state.characters.filter((character) => {
        return character.value !== dm;
      });
      this.setState({ characters: pcs }, this.validateCharacters);
    }
  };

  validateDm = () => {
    const { dm } = this.state;
    let dmValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (dm === "") {
      dmValid = false;
      errorMsg.dm = "Mission must have a DM";
    }

    this.setState({ dmValid, errorMsg }, this.validateForm);
  };

  onCharactersChange = (selectedValues) => {
    let pcs = "";
    if (selectedValues) {
      pcs = selectedValues.map((character) => {
        return { value: character.value, label: character.label };
      });
    }
    this.setState({ characters: pcs }, this.validateCharacters);
  };

  validateCharacters = () => {
    const { characters } = this.state;
    let charactersValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (characters.length === 0) {
      charactersValid = false;
      errorMsg.characters = "Mission must have at least 1 Character";
    }

    this.setState({ charactersValid, errorMsg }, this.validateForm);
  };

  onMinLevelChange = (e) => {
    const minLevel = e.target.value;
    this.setState({ minLevel }, this.validateMinMaxLevel);
  };

  onMaxLevelChange = (e) => {
    const maxLevel = e.target.value;
    this.setState({ maxLevel }, this.validateMinMaxLevel);
  };

  validateMinMaxLevel = () => {
    const { minLevel, maxLevel } = this.state;
    let maxLevelValid = true;
    let minLevelValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (!Number.isInteger(Number(maxLevel))) {
      maxLevelValid = false;
      errorMsg.maxLevel = "Must be a whole number";
    } else if (maxLevel < 1) {
      maxLevelValid = false;
      errorMsg.maxLevel = "Must be a larger than 0";
    } else if (maxLevel > 20) {
      maxLevelValid = false;
      errorMsg.maxLevel = "Must be lower than 20";
    } else if (minLevel > maxLevel) {
      maxLevelValid = false;
      errorMsg.maxLevel =
        "Maximum level must be higher than to or equal the minimum level";
    }

    if (!Number.isInteger(Number(minLevel))) {
      minLevelValid = false;
      errorMsg.minLevel = "Must be a whole number";
    } else if (minLevel < 1) {
      minLevelValid = false;
      errorMsg.minLevel = "Must be a number larger than 0";
    } else if (minLevel > 20) {
      minLevelValid = false;
      errorMsg.minLevel = "Must be lower than 20";
    } else if (minLevel > maxLevel) {
      minLevelValid = false;
      errorMsg.minLevel =
        "Minimum level must be lower than to or equal the maximum level";
    }

    this.setState(
      { maxLevelValid, errorMsg, minLevelValid },
      this.validateForm
    );
  };

  onDatePickerChange = (date) => {
    this.setState({ startDate: date }, this.validateStartDate);
  };

  validateStartDate = () => {
    const { startDate } = this.state;
    let startDateValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (!startDate) {
      startDateValid = false;
      errorMsg.startDate = "Played on date cannot be blank";
    }
    this.setState({ startDateValid, errorMsg }, this.validateForm);
  };

  validateForm = () => {
    const {
      nameValid,
      dmValid,
      charactersValid,
      startDateValid,
      minLevelValid,
      maxLevelValid,
    } = this.state;
    this.setState({
      formValid:
        nameValid &&
        dmValid &&
        charactersValid &&
        startDateValid &&
        minLevelValid &&
        maxLevelValid,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const pcs = this.state.characters.map((character) => {
      return character.value;
    });

    this.props.onSubmit({
      name: this.state.name,
      dm: this.state.dm,
      characters: pcs,
      playedOn: `${this.state.startDate.getFullYear()}-${
        this.state.startDate.getMonth() + 1
      }-${this.state.startDate.getDate()}`,
      episode: `${this.props.highestEpisode + 1}`,
      levelMin: this.state.minLevel,
      levelMax: this.state.maxLevel,
    });
  };

  selectDMOptions = this.props.characters.map((character) => {
    return {
      value: character.id,
      label: character.firstName + " " + character.lastName,
    };
  });

  render() {
    const selectFilteredCharacterOptions = this.state.filteredCharacters.map(
      (character) => {
        return {
          value: character.id,
          label: character.firstName + " " + character.lastName,
        };
      }
    );

    return (
      <form onSubmit={this.onSubmit}>
        <label>Mission Name</label>
        <input
          type="text"
          placeholder="Enter Mission Name"
          value={this.state.name}
          onChange={this.onNameChange}
        />
        <ValidationMessage
          valid={this.state.nameValid}
          message={this.state.errorMsg.name}
        />
        <label>DM</label>
        {this.props.characters.isLoading ? null : (
          <Select
            id="dm"
            name="dm"
            options={this.selectDMOptions}
            onChange={this.onDmChange}
          />
        )}
        <ValidationMessage
          valid={this.state.dmValid}
          message={this.state.errorMsg.dm}
        />
        <label>Characters</label>
        {this.props.charactersIsLoading ? null : (
          <Select
            id="characters"
            name="characters"
            isMulti
            options={selectFilteredCharacterOptions}
            value={this.state.characters}
            onChange={this.onCharactersChange}
          />
        )}
        <ValidationMessage
          valid={this.state.charactersValid}
          message={this.state.errorMsg.characters}
        />
        <label>Minimum Level</label>
        <input
          type="number"
          min="1"
          step="1"
          placeholder="Minimum level for the mission"
          value={this.state.minLevel}
          onChange={this.onMinLevelChange}
        />
        <ValidationMessage
          valid={this.state.minLevelValid}
          message={this.state.errorMsg.minLevel}
        />
        <label>Maximum Level</label>
        <input
          type="number"
          min="1"
          step="1"
          placeholder="Maximum level for the mission"
          value={this.state.maxLevel}
          onChange={this.onMaxLevelChange}
        />
        <ValidationMessage
          valid={this.state.maxLevelValid}
          message={this.state.errorMsg.maxLevel}
        />
        <label>Played On</label>
        <DatePicker
          selected={this.state.startDate}
          onChange={this.onDatePickerChange}
        />
        <ValidationMessage
          valid={this.state.startDateValid}
          message={this.state.errorMsg.startDate}
        />
        <div>
          Name:{" "}
          {this.state.nameValid ? (
            <i className="valid-input icon-ok-circle" />
          ) : (
            <i className="invalid-input icon-remove-sign" />
          )}
        </div>
        <div>
          DM:{" "}
          {this.state.dmValid ? (
            <i className="valid-input icon-ok-circle" />
          ) : (
            <i className="invalid-input icon-remove-sign" />
          )}
        </div>
        <div>
          Characters:{" "}
          {this.state.charactersValid ? (
            <i className="valid-input icon-ok-circle" />
          ) : (
            <i className="invalid-input icon-remove-sign" />
          )}
        </div>
        <div>
          Played On Date:{" "}
          {this.state.startDateValid ? (
            <i className="valid-input icon-ok-circle" />
          ) : (
            <i className="invalid-input icon-remove-sign" />
          )}
        </div>
        <div>
          Minimum Level:{" "}
          {this.state.minLevelValid ? (
            <i className="valid-input icon-ok-circle" />
          ) : (
            <i className="invalid-input icon-remove-sign" />
          )}
        </div>
        <div>
          Maximum Level:{" "}
          {this.state.maxLevelValid ? (
            <i className="valid-input icon-ok-circle" />
          ) : (
            <i className="invalid-input icon-remove-sign" />
          )}
        </div>
        <div>
          <button
            disabled={!this.state.formValid}
            variant="primary"
            type="submit"
          >
            Add Mission
          </button>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  startSetCharacters: () => dispatch(startSetCharacters()),
  startSetMissions: () => dispatch(startSetMissions()),
});

const mapStateToProps = (state, props) => ({
  characters: state.characters.data.filter(
    (character) => character.dead === false
  ),
  charactersIsLoading: state.characters.isLoading,
  highestEpisode: state.missions.data.sort((a, b) =>
    a.episode < b.episode ? 1 : -1
  )[0].episode,
});

export default connect(mapStateToProps, mapDispatchToProps)(MissionForm);
