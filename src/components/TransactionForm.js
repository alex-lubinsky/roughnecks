import React from "react";
import Select from "react-select";
import { startSetCharacters } from "../actions/characters";
import { startSetMissions } from "../actions/missions";
import { connect } from "react-redux";
import ValidationMessage from "./ValidationMessage";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { AiOutlineCheck } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";

class TransactionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.transaction ? props.transaction.name : "",
      nameValid: props.transaction ? true : false,
      mission: props.mission ? props.mission : "",
      missionValid: props.transaction ? true : false,
      characters: props.pcs ? props.pcs : [],
      charactersValid: props.pcs ? true : false,
      gold: props.transaction ? props.transaction.goldPcs : 0,
      goldValid: true,
      silver: props.transaction ? props.transaction.silverPcs : 0,
      silverValid: true,
      copper: props.transaction ? props.transaction.copperPcs : 0,
      copperValid: true,
      moneyValid: props.transaction ? true : false,
      airshipPot: props.transaction ? props.transaction.airshipPot : true,
      airshipPotDisabled: props.airshipPotDiabled ? props.airshipPotDiabled : false,
      earnedSpent: props.earnedSpent ? props.earnedSpent : { label: "Earned", value: "Earned" },
      errorMsg: props.transaction ? {} : {
        moneyValid: "Total Gold, Silver and Copper must be greater than 0.",
      },
      formValid: props.transaction ? true : false,
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

  onAirshipPotChange = (e) => {
    const airshipPot = e.target.checked;
    this.setState({ airshipPot });
  };

  onEarnedSpentChange = (selectedValue) => {
    this.setState({ earnedSpent: selectedValue });
    if (selectedValue.value === "Earned") {
      this.setState({ airshipPotDisabled: false });
    } else {
      this.setState({ airshipPotDisabled: true, airshipPot: false });
    }
  };

  onGoldPcsChange = (e) => {
    const gold = e.target.value;
    this.setState({ gold }, this.validateGold);
  };

  validateGold = () => {
    const { gold, silver, copper, silverValid, copperValid } = this.state;
    let goldValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (!Number.isInteger(Number(gold))) {
      goldValid = false;
      errorMsg.gold = "Gold must be a whole number";
    } else if (gold < 0) {
      goldValid = false;
      errorMsg.gold = "Gold must be a number larger than 0";
    }

    if (
      goldValid &&
      silverValid &&
      copperValid &&
      (gold > 0 || silver > 0 || copper > 0)
    ) {
      this.setState(
        { goldValid, errorMsg, moneyValid: true },
        this.validateForm
      );
    } else {
      errorMsg.moneyValid =
        "Total Gold, Silver and Copper must be greater than 0.";
      this.setState(
        { goldValid, errorMsg, moneyValid: false },
        this.validateForm
      );
    }
  };

  onSilverPcsChange = (e) => {
    const silver = e.target.value;
    this.setState({ silver }, this.validateSilver);
  };

  validateSilver = () => {
    const { silver, gold, copper, goldValid, copperValid } = this.state;
    let silverValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (!Number.isInteger(Number(silver))) {
      silverValid = false;
      errorMsg.silver = "Silver must be a whole number";
    } else if (silver < 0) {
      silverValid = false;
      errorMsg.silver = "Silver must be a number larger than 0";
    }
    if (
      goldValid &&
      silverValid &&
      copperValid &&
      (silver > 0 || gold > 0 || copper > 0)
    ) {
      this.setState(
        { silverValid, errorMsg, moneyValid: true },
        this.validateForm
      );
    } else {
      errorMsg.moneyValid =
        "Total Gold, Silver and Copper must be greater than 0.";
      this.setState(
        { silverValid, errorMsg, moneyValid: false },
        this.validateForm
      );
    }
  };

  onCopperPcsChange = (e) => {
    const copper = e.target.value;
    this.setState({ copper }, this.validateCopper);
  };

  validateCopper = () => {
    const { copper, silver, gold, goldValid, silverValid } = this.state;
    let copperValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (!Number.isInteger(Number(copper))) {
      copperValid = false;
      errorMsg.copper = "Copper must be a whole number";
    } else if (copper < 0) {
      copperValid = false;
      errorMsg.copper = "Copper must be a number larger than 0";
    }

    if (
      goldValid &&
      silverValid &&
      copperValid &&
      (copper > 0 || gold > 0 || silver > 0)
    ) {
      this.setState(
        { copperValid, errorMsg, moneyValid: true },
        this.validateForm
      );
    } else {
      errorMsg.moneyValid =
        "Total Gold, Silver and Copper must be greater than 0.";
      this.setState(
        { copperValid, errorMsg, moneyValid: false },
        this.validateForm
      );
    }
  };

  onMissionChange = (selectedValues) => {
    const mission = selectedValues.value;
    this.setState({ mission }, this.validateMission);

    if (
      this.state.earnedSpent.label === "Earned" &&
      this.state.characters.length === 0
    ) {
      const pcs = this.props.missions
        .find((mission) => selectedValues.value === mission.id)
        .characters.map((character) => {
          const pc = this.props.characters.find((pc) => pc.id === character);

          if (pc !== undefined) {
            return { value: pc.id, label: pc.fullName };
          } else {
            return null;
          }
        });
      this.setState({ characters: pcs }, this.validateCharacters);
    }
  };

  validateMission = () => {
    const { mission } = this.state;
    let missionValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (mission === "") {
      missionValid = false;
      errorMsg.mission = "Must select a mission";
    }

    this.setState({ missionValid, errorMsg }, this.validateForm);
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
      errorMsg.characters = "Transaction must have at least 1 Character";
    }

    this.setState({ charactersValid, errorMsg }, this.validateForm);
  };

  validateForm = () => {
    const {
      nameValid,
      goldValid,
      silverValid,
      copperValid,
      moneyValid,
      missionValid,
      charactersValid,
    } = this.state;

    this.setState({
      formValid:
        nameValid &&
        goldValid &&
        silverValid &&
        copperValid &&
        moneyValid &&
        missionValid &&
        charactersValid,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const pcs = this.state.characters.map((character) => {
      return character.value;
    });
    let earnedSpent = -1;
    if (this.state.earnedSpent.value === "Earned") {
      earnedSpent = 1;
    }

    this.props.onSubmit({
      name: this.state.name,
      mission: this.state.mission.value,
      characters: pcs,
      goldPcs: this.state.gold === "" ? 0 : this.state.gold,
      silverPcs: this.state.silver === "" ? 0 : this.state.silver,
      copperPcs: this.state.copper === "" ? 0 : this.state.copper,
      airshipPot: this.state.airshipPot,
      earnedSpent: earnedSpent
    });
  };

  render() {
    const selectMissionOptions = this.props.missions
      .sort((a, b) => (a.episode > b.episode ? -1 : 1))
      .map((mission) => {
        return { value: mission.id, label: mission.name };
      });

    const selectCharacterOptions = this.props.characters.map((character) => {
      return {
        value: character.id,
        label: character.fullName,
      };
    });

    return (
      <Form onSubmit={this.onSubmit}>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <Form.Group>
                  <span
                    className={
                      this.state.nameValid ? "valid-input" : "invalid-input"
                    }
                  >
                    <Form.Label>Name</Form.Label>
                    {this.state.nameValid ? <AiOutlineCheck /> : <IoMdClose />}
                  </span>
                  <Form.Control
                    type="text"
                    value={this.state.name}
                    onChange={this.onNameChange}
                    placeholder="Enter Short Transaction Description"
                  />
                  <ValidationMessage
                    valid={this.state.nameValid}
                    message={this.state.errorMsg.name}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <span
                    className={
                      this.state.goldValid ? "valid-input" : "invalid-input"
                    }
                  >
                    <Form.Label>Gold</Form.Label>
                    {this.state.goldValid ? <AiOutlineCheck /> : <IoMdClose />}
                  </span>
                  <Form.Control
                    type="number"
                    min="0"
                    step="1"
                    value={this.state.gold}
                    onChange={this.onGoldPcsChange}
                    placeholder="Enter Transaction Gold"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <span
                    className={
                      this.state.silverValid ? "valid-input" : "invalid-input"
                    }
                  >
                    <Form.Label>Silver</Form.Label>
                    {this.state.silverValid ? (
                      <AiOutlineCheck />
                    ) : (
                      <IoMdClose />
                    )}
                  </span>
                  <Form.Control
                    type="number"
                    min="0"
                    step="1"
                    value={this.state.silver}
                    onChange={this.onSilverPcsChange}
                    placeholder="Enter Transaction Silver"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <span
                    className={
                      this.state.copperValid ? "valid-input" : "invalid-input"
                    }
                  >
                    <Form.Label>Copper</Form.Label>
                    {this.state.copperValid ? (
                      <AiOutlineCheck />
                    ) : (
                      <IoMdClose />
                    )}
                  </span>
                  <Form.Control
                    type="number"
                    min="0"
                    step="1"
                    value={this.state.copper}
                    onChange={this.onCopperPcsChange}
                    placeholder="Enter Transaction Copper"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group>
              <ValidationMessage
                valid={this.state.goldValid}
                message={this.state.errorMsg.gold}
              />
              <ValidationMessage
                valid={this.state.silverValid}
                message={this.state.errorMsg.silver}
              />
              <ValidationMessage
                valid={this.state.copperValid}
                message={this.state.errorMsg.copper}
              />
              <ValidationMessage
                valid={this.state.moneyValid}
                message={this.state.errorMsg.moneyValid}
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group>
                  <span className="valid-input">
                    <Form.Label>Transaction Type</Form.Label>
                    <AiOutlineCheck />
                  </span>
                  <Select
                    options={[
                      { value: "Earned", label: "Earned" },
                      { value: "Spent", label: "Spent" },
                    ]}
                    value={this.state.earnedSpent}
                    onChange={this.onEarnedSpentChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <span className="valid-input">
                    <Form.Label>Airship Pot</Form.Label>
                    <AiOutlineCheck />
                  </span>
                  <Form.Control
                    type="checkbox"
                    checked={this.state.airshipPot}
                    onChange={this.onAirshipPotChange}
                    disabled={this.state.airshipPotDisabled ? "disabled" : ""}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <span
                    className={
                      this.state.missionValid ? "valid-input" : "invalid-input"
                    }
                  >
                    <Form.Label>Mission</Form.Label>
                    {this.state.missionValid ? (
                      <AiOutlineCheck />
                    ) : (
                      <IoMdClose />
                    )}
                  </span>
                  {this.props.missionsIsLoading ? <div>Loading...</div> : (
                    <Select
                      value={this.state.mission}
                      options={selectMissionOptions}
                      onChange={this.onMissionChange}
                    />
                  )}
                  <ValidationMessage
                    valid={this.state.missionValid}
                    message={this.state.errorMsg.mission}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <span
                    className={
                      this.state.missionValid ? "valid-input" : "invalid-input"
                    }
                  >
                    <Form.Label>Characters</Form.Label>
                    {this.state.charactersValid ? (
                      <AiOutlineCheck />
                    ) : (
                      <IoMdClose />
                    )}
                  </span>
                  {this.props.charactersIsLoading ? <div>Loading...</div> : (
                    <Select
                      isMulti
                      options={selectCharacterOptions}
                      value={this.state.characters}
                      onChange={this.onCharactersChange}
                    />
                  )}
                  <ValidationMessage
                    valid={this.state.charactersValid}
                    message={this.state.errorMsg.characters}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={!this.state.formValid} type="submit">
            {this.props.editForm ? "Edit Transaction" : "Add Transaction"}
          </Button>
        </Modal.Footer>
      </Form>
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
  missions: state.missions.data.filter((mission) => mission.visable === true),
  charactersIsLoading: state.characters.isLoading,
  missionsIsLoading: state.missions.isLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionForm);
