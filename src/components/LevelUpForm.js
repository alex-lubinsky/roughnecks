import React from "react";
import { connect } from "react-redux";
import ClassForm from "./ClassForm";
import ValidationMessage from "./ValidationMessage";
import { buildClassArray } from "../functions/levels";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {AiOutlineCheck} from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';


class LevelUpForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      passivePerception: this.props.character.passivePerception
        ? this.props.character.passivePerception
        : 0,
      passivePerceptionValid: true,
      maxHp: this.props.character.maxHp ? this.props.character.maxHp : 0,
      maxHpValid: true,
      subclassName: "",
      subclassValid: false,
      errorMsg: {},
      formValid: false,
    };
  }

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
      errorMsg.passivePerception = "Passive Perception must be a whole number";
    } else if (passivePerception < 1) {
      passivePerceptionValid = false;
      errorMsg.passivePerception = "Passive Perception must be a number larger than 0";
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
      errorMsg.maxHp = "Max HP must be a whole number";
    } else if (maxHp < 1) {
      maxHpValid = false;
      errorMsg.maxHp = "Max Hp must be a number larger than 0";
    }

    this.setState({ maxHpValid, errorMsg }, this.validateForm);
  };

  onClassFormChange = (subclass) => {
    this.setState(
      {
        subclassName: subclass.subclassName,
        subclassValid: subclass.subclassValid,
      },
      this.validateForm
    );
  };

  validateForm = () => {
    const { passivePerceptionValid, maxHpValid, subclassValid } = this.state;
    this.setState({
      formValid: passivePerceptionValid && maxHpValid && subclassValid,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    let date = new Date();
    this.props.onSubmit({
      passivePerception: this.state.passivePerception,
      maxHp: this.state.maxHp,
      subclassName: this.state.subclassName,
      levelNumber: this.props.pcNextLevelNumber,
      dateCreated: `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`,
    });
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <Form.Group>
                  <span className={this.state.passivePerceptionValid ? "valid-input" : "invalid-input"}>
                    <Form.Label>Passive Perception</Form.Label>
                    {this.state.passivePerceptionValid ? <AiOutlineCheck /> : <IoMdClose />}
                  </span>
                  <Form.Control
                    type="number"
                    min="0"
                    step="1"
                    value={this.state.passivePerception}
                    onChange={this.onPassivePerceptionChange}
                    placeholder={`Enter ${this.props.character.firstName}'s Passive Perception`}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <span className={this.state.maxHpValid ? "valid-input" : "invalid-input"}>
                    <Form.Label>Max HP</Form.Label>
                    {this.state.maxHpValid ? <AiOutlineCheck /> : <IoMdClose />}
                  </span>
                  <Form.Control
                    type="number"
                    min="0"
                    step="1"
                    value={this.state.maxHp}
                    onChange={this.onMaxHpChange}
                    placeholder={`Enter ${this.props.character.firstName}'s Max HP`}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <ValidationMessage
                  valid={this.state.passivePerceptionValid}
                  message={this.state.errorMsg.passivePerception}
                />
                <ValidationMessage
                  valid={this.state.maxHpValid}
                  message={this.state.errorMsg.maxHp}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <ClassForm
                  subclasses={this.props.subclasses}
                  onChange={this.onClassFormChange}
                  characterLevels={buildClassArray(
                    this.props.pcSubclasses.filter(
                      (pcSubclass) =>
                        pcSubclass.classCharacter === this.props.characterid
                    ),
                    this.props.subclasses
                  )}
                />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={!this.state.formValid} type="submit">
            Level Up
          </Button>
        </Modal.Footer>        
      </Form>
    );
  }
}

const mapStateToProps = (state, props) => ({
  character: state.characters.data.find(
    (character) => character.id === props.character.id
  ),
  characterid: props.character.id,
  pcNextLevelNumber:
    state.pcSubclasses.data.filter(
      (pcSubclass) => pcSubclass.classCharacter === props.character.id
    ).length + 1,
});

export default connect(mapStateToProps)(LevelUpForm);
