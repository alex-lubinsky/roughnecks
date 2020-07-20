import React from 'react';
import Select from 'react-select';
import { startSetCharacters } from '../actions/characters';
import { startSetMissions } from '../actions/missions';
import { connect } from 'react-redux';
import ValidationMessage from './ValidationMessage';
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'; 

class TransactionForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '', nameValid: false,
      mission: '', missionValid: false,
      characters: [], charactersValid: false,
      gold: 0, goldValid: true,
      silver: 0, silverValid: true,
      copper: 0, copperValid: true,
      moneyValid: false,
      airshipPot: true,
      airshipPotVisable: true,
      earnedSpent: {label: 'Earned', value: 'Earned'},
      errorMsg: {},
      formValid: false
    }
  }

  componentDidMount() {
    this.props.startSetCharacters()
    this.props.startSetMissions()
  }

  onNameChange = (e) => {
    const name = e.target.value;
    this.setState({ name }, this.validateName) 
  };

  validateName = () => {
    const {name} = this.state;
    let nameValid = true;
    let errorMsg = {...this.state.errorMsg}

    if (name.length < 3 ) {
      nameValid = false;
      errorMsg.name = 'Must be at least 3 characters long';
    }

    this.setState({nameValid, errorMsg}, this.validateForm)
  };

  onAirshipPotChange = (e) => {
    const airshipPot = e.target.value
    this.setState({ airshipPot })
  }

  onEarnedSpentChange = (selectedValue) => {
    this.setState({ earnedSpent: selectedValue })
    if (selectedValue.value === 'Earned') {
      this.setState({airshipPotVisable: true})
    } else {
      this.setState({airshipPotVisable: false, airshipPot: false})
    }
  }

  onGoldPcsChange = (e) => {
    const gold = e.target.value;
    this.setState({ gold }, this.validateGold)
  };

  validateGold = () => {
    const {gold, silver, copper, silverValid, copperValid} = this.state;
    let goldValid = true;
    let errorMsg = {...this.state.errorMsg}

    if (!Number.isInteger(Number(gold))) {
      goldValid = false;
      errorMsg.gold = 'Must be a whole number';
    } else if (gold < 0) {
      goldValid = false;
      errorMsg.gold = 'Must be a number larger than 0';
    }

    if (goldValid && silverValid && copperValid && (gold > 0 || silver > 0 || copper > 0)) {
      this.setState({goldValid, errorMsg, moneyValid: true}, this.validateForm)
    } else {
      this.setState({goldValid, errorMsg, moneyValid: false}, this.validateForm)
    }
  }

  onSilverPcsChange = (e) => {
    const silver = e.target.value;
    this.setState({ silver }, this.validateSilver) 
  };

  validateSilver = () => {
    const {silver, gold, copper, goldValid, copperValid} = this.state;
    let silverValid = true;
    let errorMsg = {...this.state.errorMsg}

    if (!Number.isInteger(Number(silver))) {
      silverValid = false;
      errorMsg.silver = 'Must be a whole number';
    } else if (silver < 0) {
      silverValid = false;
      errorMsg.silver = 'Must be a number larger than 0';
    }
    if (goldValid && silverValid && copperValid && (silver > 0 || gold > 0 || copper > 0)) {
      this.setState({silverValid, errorMsg, moneyValid: true}, this.validateForm)
    } else {
      this.setState({silverValid, errorMsg, moneyValid: false}, this.validateForm)
    }
  }

  onCopperPcsChange = (e) => {
    const copper = e.target.value;
    this.setState({ copper }, this.validateCopper) 
  };

  validateCopper = () => {
    const {copper, silver, gold, goldValid, silverValid} = this.state;
    let copperValid = true;
    let errorMsg = {...this.state.errorMsg}

    if (!Number.isInteger(Number(copper))) {
      copperValid = false;
      errorMsg.copper = 'Must be a whole number';
    } else if (copper < 0) {
      copperValid = false;
      errorMsg.copper = 'Must be a number larger than 0';
    }

    if (goldValid && silverValid && copperValid && (copper > 0 || gold > 0 || silver > 0)) {
      this.setState({copperValid, errorMsg, moneyValid: true}, this.validateForm)
    } else {
      this.setState({copperValid, errorMsg, moneyValid: false}, this.validateForm)
    }
  }

  onMissionChange = (selectedValues) => {
    const mission = selectedValues.value
    this.setState({ mission }, this.validateMission)
  }

  validateMission = () => {
    const {mission} = this.state;
    let missionValid = true;
    let errorMsg = {...this.state.errorMsg}

    if (mission === '' ) {
      missionValid = false;
      errorMsg.mission = 'Must select a mission';
    }

    this.setState({missionValid, errorMsg}, this.validateForm)
  }

  onCharactersChange = (selectedValues) => {
    let pcs = ''
    if (selectedValues) {
      pcs = selectedValues.map((character) => {
        return {value: character.value, label: character.label}
      })
    }
    this.setState({characters: pcs}, this.validateCharacters)
  }

  validateCharacters = () => {
    const {characters} = this.state;
    let charactersValid = true;
    let errorMsg = {...this.state.errorMsg}

    if (characters.length === 0) {
      charactersValid = false;
      errorMsg.characters = 'Transaction must have at least 1 Character';
    }

    this.setState({charactersValid, errorMsg}, this.validateForm)
  }

  validateForm = () => {
    const { nameValid, goldValid, silverValid, copperValid, moneyValid, missionValid, charactersValid } = this.state

    this.setState({formValid: nameValid && goldValid && silverValid && copperValid && moneyValid && missionValid && charactersValid})
  }

  onSubmit = (e) => {
    e.preventDefault();
    const pcs = this.state.characters.map((character) => {
      return character.value
    })
    let earnedSpent = -1
    if (this.state.earnedSpent.value === "Earned") {
      earnedSpent = 1
    }

    this.props.onSubmit({ 
      name: this.state.name, 
      mission: this.state.mission, 
      characters: pcs, 
      goldPcs: this.state.gold === "" ? 0 : this.state.gold,
      silverPcs: this.state.silver === "" ? 0 : this.state.silver,
      copperPcs: this.state.copper === "" ? 0 : this.state.copper,
      airshipPot: this.state.airshipPot,
      earnedSpent: earnedSpent
    })
  }

  render() {

    const selectMissionOptions = this.props.missions.map((mission) => {
      return {value: mission.id, label: mission.name }
    })

    const selectCharacterOptions = this.props.characters.map((character) => {
      return {value: character.id, label: character.firstName + " " + character.lastName}
    })

    return (

      <Container>
        <Form onSubmit={this.onSubmit}>
          <Modal.Body>

            <Form.Label>Name</Form.Label>
            <Form.Control 
              type="text" 
              value={this.state.name} 
              onChange={this.onNameChange}
              placeholder="Enter Short Transaction Description" 
            />
            <ValidationMessage valid={this.state.nameValid} message={this.state.errorMsg.name} />

            <Form.Label>Gold</Form.Label>
            <Form.Control 
              type="number" 
              min="0"
              step="1"
              value={this.state.gold} 
              onChange={this.onGoldPcsChange}
              placeholder="Enter Transaction Gold" 
            />
            <ValidationMessage valid={this.state.goldValid} message={this.state.errorMsg.gold} />

            <Form.Label>Silver</Form.Label>
            <Form.Control 
              type="number" 
              min="0"
              step="1"
              value={this.state.silver} 
              onChange={this.onSilverPcsChange}
              placeholder="Enter Transaction Silver" 
            />
            <ValidationMessage valid={this.state.silverValid} message={this.state.errorMsg.silver} />

            <Form.Label>Copper</Form.Label>
            <Form.Control 
              type="number" 
              min="0"
              step="1"
              value={this.state.copper} 
              onChange={this.onCopperPcsChange}
              placeholder="Enter Transaction Copper" 
            />
            <ValidationMessage valid={this.state.copperValid} message={this.state.errorMsg.copper} />
          
            <Form.Label>Transaction Type</Form.Label>
            <Select 
              options={[{value: "Earned", label:"Earned"}, {value: "Spent", label: "Spent"}]} 
              value={this.state.earnedSpent} 
              onChange={this.onEarnedSpentChange}
            />

            {this.state.airshipPotVisable ? 
              <div>
                <Form.Label>Airship Pot</Form.Label>
                <Form.Control 
                  type="checkbox" 
                  defaultChecked={this.state.airshipPot} 
                  onChange={this.onAirshipPotChange} />
              </div> : null}

            <Form.Label>Mission the Transaction happened on</Form.Label>
            {this.props.missionsIsLoading ? null :
              <Select options={selectMissionOptions} onChange={this.onMissionChange} />
            }
            <ValidationMessage valid={this.state.missionValid} message={this.state.errorMsg.mission} />
            
            <Form.Label>Characters in the Transaction</Form.Label>
            {this.props.charactersIsLoading ? null :
              <Select
                isMulti
                options={selectCharacterOptions}
                value={this.state.characters}
                onChange={this.onCharactersChange}
              />
            }
            <ValidationMessage valid={this.state.charactersValid} message={this.state.errorMsg.characters} />
          </Modal.Body>
          <Modal.Footer>
            <div>
              Name: {this.state.nameValid ? <i className='valid-input icon-ok-circle' /> : <i className='invalid-input icon-remove-sign' />}
            </div>
            <div>
              Gold Amount: {this.state.goldValid ? <i className='valid-input icon-ok-circle' /> : <i className='invalid-input icon-remove-sign' />}
            </div>
            <div>
              Silver Amount: {this.state.silverValid ? <i className='valid-input icon-ok-circle' /> : <i className='invalid-input icon-remove-sign' />}
            </div>
            <div>
              Copper Amount: {this.state.copperValid ? <i className='valid-input icon-ok-circle' /> : <i className='invalid-input icon-remove-sign' />}
            </div>
            <div>
              Total Money Amount: {this.state.moneyValid ? <i className='valid-input icon-ok-circle' /> : <i className='invalid-input icon-remove-sign' />}
            </div>
            <div>
              Mission: {this.state.missionValid ? <i className='valid-input icon-ok-circle' /> : <i className='invalid-input icon-remove-sign' />}
            </div>
            <div>
              Characters: {this.state.charactersValid ? <i className='valid-input icon-ok-circle' /> : <i className='invalid-input icon-remove-sign' />}
            </div>

            <Button disabled={!this.state.formValid} type="submit">Add Transaction</Button>
          </Modal.Footer>
        </Form>
      </Container>
    )
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  startSetCharacters: () => dispatch(startSetCharacters()),
  startSetMissions: () => dispatch(startSetMissions())
})

const mapStateToProps = (state, props) => ({
  characters: state.characters.data.filter(character => character.dead === false),
  missions: state.missions.data.filter(mission => mission.visable === true),
  charactersIsLoading: state.characters.isLoading,
  missionsIsLoading: state.missions.isLoading,
})

export default connect(mapStateToProps,mapDispatchToProps)(TransactionForm)