import React from "react";
import Select from "react-select";
import { startSetCharacters } from "../actions/characters";
import { connect } from "react-redux";
import ValidationMessage from "./ValidationMessage";
import { startSetMissions } from "../actions/missions";
import { startSetTransactions } from "../actions/transactions";
import { getDowntimeDays } from "../functions/levels";
import { startSetPCSubclasses } from "../actions/playercharacterclasses";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from 'react-bootstrap/Container';
import { AiOutlineCheck } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';
import { startSetDowntime } from '../actions/downtime';
import { startSetDowntimeTypes } from '../actions/downtimetypes';
import { startSetDowntimeJobs } from '../actions/downtimejobs';
import { startSetSubclasses } from '../actions/subclasses';
import moment from 'moment';
import { MISCELLANEOUS, THE_JOB_BOARD, THE_TRAINING_ROOM, MATERIALS_SCAVENGING, CARLYLES_TRADING_NETWORK} from '../variables/downtimejobvariables'

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
      showDowntimeJobs: false,
      downtimeJobValid: true,
      downtimeJob: "",
      showDescription: false,
    };
  }

  componentDidMount() {
    this.props.startSetCharacters();
    this.props.startSetMissions();
    this.props.startSetTransactions();
    this.props.startSetPCSubclasses();
    this.props.startSetDowntime();
    this.props.startSetDowntimeTypes();
    this.props.startSetDowntimeJobs();
    this.props.startSetSubclasses();
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
    let showDowntimeJobs = false
    let downtimeJobValid = true
    let descriptionValid = true
    let showDescription = false

    if (selectedValue.value === THE_JOB_BOARD){
      showDowntimeJobs = true
      downtimeJobValid = false
    } else if (selectedValue.value === MISCELLANEOUS) {
      showDescription = true
      descriptionValid = false
    }

    this.setState({ downtimeType, showDowntimeJobs, downtimeJobValid, descriptionValid, showDescription }, this.validateDowntimeType)
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

  onDowntimeJobChange = (selectedValue) => {
    const downtimeJob = selectedValue;
    this.setState({ downtimeJob }, this.validateDowntimeJob)
  }

  validateDowntimeJob = () => {
    const { downtimeJob } = this.state;
    let downtimeJobValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (downtimeJob.label === "") {
      downtimeJobValid = false;
      errorMsg.downtimeJob = "Downtime job must selected";
    }

    this.setState({ downtimeJobValid, errorMsg }, this.validateForm);
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
        this.props.downtime.filter(dtt =>
          dtt.character === character.id
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
      downtimeJobValid,
    } = this.state;
    this.setState({
      formValid:
        descriptionValid &&
        downtimeTypeValid &&
        characterValid &&
        downtimeJobValid &&
        numOfDaysSpentValid,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    let transactionAmount = 0;
    let description = this.state.description;
    const levels = this.props.pcSubclasses.filter(pcSubclass => pcSubclass.classCharacter === this.state.character.value)
    
    if (this.state.downtimeType.value === THE_JOB_BOARD){

      if (this.state.downtimeJob.value === 0 ){
        levels.forEach(level => {
          transactionAmount += (Math.floor(Math.random() * 6) + 1)
        })
      } else {  
        levels.forEach(level => {
          if(this.props.subclasses.find(subclass => level.playerClass === subclass.id).className === this.state.downtimeJob.class) {
            transactionAmount += (Math.floor(Math.random() * 10) + 1)
          } else {
            transactionAmount += (Math.floor(Math.random() * 4) + 1) 
          }
        })
      }
      transactionAmount *= this.state.numOfDaysSpent
      description = `${this.state.character.label} earns gold ${transactionAmount} working the ${this.state.downtimeJob.label} job`
    } else if (this.state.downtimeType.value === THE_TRAINING_ROOM) {
      description = `${this.state.character.label} gains ${Math.floor(this.state.numOfDaysSpent / 10)} checkmark${Math.floor(this.state.numOfDaysSpent/10) >= 2 ? 's' : ''}`
    } else if (this.state.downtimeType.value === MATERIALS_SCAVENGING) {
      for(let i = 0; i < (this.state.numOfDaysSpent / 2); i++) {
        transactionAmount += ((Math.floor(Math.random() * 100) + 1) % 25 === 0 ? 100 : 15)
      }
      description = `${this.state.character.label} finds ${transactionAmount} worth of spellcasting components`
    } else if (this.state.downtimeType.value ===  CARLYLES_TRADING_NETWORK) {
      levels.forEach(level => {
        transactionAmount += (Math.floor(Math.random() * 6) + 1) * this.state.numOfDaysSpent
      })
      description = `${this.state.character.label} aided Carylye in adding ${transactionAmount} gold to his network`
    }

    this.props.onSubmit({
      description: description,
      downtimeType: this.state.downtimeType,
      character: this.state.character.value,
      numOfDaysSpent: this.state.numOfDaysSpent,
      downtimeJob: this.state.downtimeJob,
      transactionAmount: transactionAmount,
      mission: this.props.missions.find(
        (mission) => mission.name === "Downtime"
      ).id,
    });
  };

  selectCharacterOptions = this.props.characters.map((character) => {
    return {
      value: character.id,
      label: `${character.fullName}`,
    };
  });

  selectDowntimeTypeOptions = this.props.downtimeTypes.map(ddt => {
    return {value: ddt.id, label: ddt.name, description: ddt.description}
  })      

  getSelectDowntimeJobOptions = () => {
    let selectDowntimeJobOptions = [{value: 0, label: 'The Dunshire Trading Company', class: ''}]
    this.props.downtimeJobs.filter(ddj => {
      return moment(ddj.validUntil).isSameOrAfter(moment(), 'day')
    }).forEach(ddj => {
      selectDowntimeJobOptions.push({value: ddj.id, label: `Specialized Job: ${ddj.name} - ${ddj.chosenClass}`, class: ddj.chosenClass})
    })
    return selectDowntimeJobOptions
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <Form.Group>
                  {(this.state.character !== "" && !this.props.downtimeIsLoading) ? (
                    <>
                      {this.state.character.label} has {this.state.characterDowntime}{" "}
                      downtime days available
                    </>
                  ) : null}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <span className={this.state.characterValid ? "valid-input" : "invalid-input"}>
                    <Form.Label>Character</Form.Label>
                    {this.state.characterValid ? <AiOutlineCheck /> : <IoMdClose />}
                  </span>
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
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <span className={this.state.downtimeTypeValid ? "valid-input" : "invalid-input"}>
                    <Form.Label>Downtime Type</Form.Label>
                    {this.state.downtimeTypeValid ? <AiOutlineCheck /> : <IoMdClose />}
                  </span>
                  <Select
                    options={this.selectDowntimeTypeOptions}
                    value={this.state.downtimeType}
                    onChange={this.onDowntimeTypeChange}
                    styles={{container: (provided, state) => ({...provided, marginBottom: '15px'})}}
                  />
                  <div>{this.state.downtimeType.description}</div>
                  <ValidationMessage
                    valid={this.state.downtimeTypeValid}
                    message={this.state.errorMsg.downtimeType}
                  />
                </Form.Group>
              </Col>
            </Row>
            {this.state.showDowntimeJobs ? 
              <Row>
                <Col>
                  <Form.Group>
                    <span className={this.state.downtimeJobValid ? "valid-input" : "invalid-input"}>
                      <Form.Label>Job</Form.Label>
                      {this.state.downtimeJobValid ? <AiOutlineCheck /> : <IoMdClose />}
                    </span>
                    <Select
                      options={this.getSelectDowntimeJobOptions()}
                      value={this.state.downtimeJob}
                      onChange={this.onDowntimeJobChange}
                      styles={{container: (provided, state) => ({...provided, marginBottom: '15px'})}}
                    />
                    {/* <div>{this.state.downtimeType.description}</div> */}
                    <ValidationMessage
                      valid={this.state.downtimeJobValid}
                      message={this.state.errorMsg.downtimeJob}
                    />
                  </Form.Group>
                </Col>
              </Row>
            : null}
            <Row>
              <Col>
                <Form.Group>
                  <span className={this.state.numOfDaysSpent ? "valid-input" : "invalid-input"}>
                    <Form.Label>Number of Days Spent</Form.Label>
                    {this.state.numOfDaysSpent ? <AiOutlineCheck /> : <IoMdClose />}
                  </span>
                  <Form.Control
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
                </Form.Group>
              </Col>
            </Row>
            {this.state.showDescription ?
              <Row>
                <Col>
                  <Form.Group>
                    <span className={this.state.descriptionValid ? "valid-input" : "invalid-input"}>
                      <Form.Label>Short Description</Form.Label>
                      {this.state.descriptionValid ? <AiOutlineCheck /> : <IoMdClose />}
                    </span>
                    <Form.Control
                      type="text"
                      placeholder="Enter Description"
                      value={this.state.description}
                      onChange={this.onDescriptionChange}
                    />
                    <ValidationMessage
                      valid={this.state.descriptionValid}
                      message={this.state.errorMsg.description}
                    />
                  </Form.Group>
                </Col>
              </Row>
            : null}
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={!this.state.formValid}
            type="submit"
            variant="primary"
          >
            Add Downtime
          </Button>
        </Modal.Footer>
      </Form>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  startSetCharacters: () => dispatch(startSetCharacters()),
  startSetMissions: () => dispatch(startSetMissions()),
  startSetTransactions: () => dispatch(startSetTransactions()),
  startSetPCSubclasses: () => dispatch(startSetPCSubclasses()),
  startSetDowntime: () => dispatch(startSetDowntime()),
  startSetDowntimeTypes: () => dispatch(startSetDowntimeTypes()),
  startSetDowntimeJobs: () => dispatch(startSetDowntimeJobs()),
  startSetSubclasses: () => dispatch(startSetSubclasses()),
});

const mapStateToProps = (state, props) => ({
  characters: state.characters.data.filter(
    (character) => (character.creator === state.auth.user.id && !character.dead)
  ),
  characterarray: state.characters.data,
  userid: state.auth.user.id,
  missions: state.missions.data,
  transactions: state.transactions.data,
  pcSubclasses: state.pcSubclasses.data,
  downtime: state.downtime.data,
  downtimeTypes: state.downtimeTypes.data,
  downtimeJobs: state.downtimeJobs.data,
  subclasses: state.subclasses.data,

  missionsIsLoading: state.missions.isLoading,
  charactersIsLoading: state.characters.isLoading,
  transactionsIsLoading: state.transactions.isLoading,
  pcSubclassesIsLoading: state.pcSubclasses.isLoading,
  downtimeIsLoading: state.downtime.isLoading,
  downtimeTypesIsLoading: state.downtimeTypes.isLoading,
  downtimeJobsIsLoading: state.downtimeJobs.isLoading,
  subclassesIsLoading: state.subclasses.isLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(DowntimeForm);
