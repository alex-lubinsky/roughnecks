import React from "react";
import { connect } from "react-redux";
import ClassBuilder from "./ClassBuilder";
import TransactionsTable from "./TransactionsTable";
import TotalEarnedMoney from "./TotalEarnedMoney";
import TotalSpentMoney from "./TotalSpentMoney";
import TotalBalanceMoney from "./TotalBalanceMoney";
import Modal from "react-bootstrap/Modal";
import AddLevelForm from "./AddLevelForm";
import { getLevel } from "../functions/levels";
import {
  startSetCharacters,
  startUpdateCharacter,
} from "../actions/characters";
import { startSetPCSubclasses } from "../actions/playercharacterclasses";
import { startSetMissions } from "../actions/missions";
import { startSetRaces } from "../actions/races";
import { startSetSubclasses } from "../actions/subclasses";
import { startSetTransactions } from "../actions/transactions";
import ClassTable from "./ClassTable";
import { startSetDowntime } from '../actions/downtime';
import DowntimeTable from './DowntimeTable';
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import { getDowntimeDays } from '../functions/levels'

class DisplayCharacterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showLevelUpModal: false,
      showKillPCModal: false,
    };
  }

  componentDidMount() {
    this.props.startSetCharacters();
    this.props.startSetPCSubclasses();
    this.props.startSetMissions();
    this.props.startSetTransactions();
    this.props.startSetSubclasses();
    this.props.startSetRaces();
    this.props.startSetDowntime();
  }

  handleLevelUpClose = () => {
    this.setState({ showLevelUpModal: false });
  };

  handleLevelUpShow = () => {
    this.setState({ showLevelUpModal: true });
  };

  handleKillPCClose = () => {
    this.setState({ showKillPCModal: false });
  };

  handleKillPCShow = () => {
    this.setState({ showKillPCModal: true });
  };

  killPcConfirm = () => {
    this.props.startUpdateCharacter(this.props.character.id, { dead: true });
    this.handleKillPCClose();
  };

  render() {
    return (
      <div className="div-margin-sm">
        {this.props.charactersIsLoading ||
        this.props.missionsIsLoading ||
        this.props.pcSubclassesIsLoading ||
        this.props.racesIsLoading ||
        this.props.subclassesIsLoading ||
        this.props.transactionsIsLoading ||
        this.props.downtimeIsLoading ? null : (
          <div>
            <Modal show={this.state.showKillPCModal} onHide={this.handleKillPCClose}>
              <Modal.Header closeButton>
                <h3>Are you sure?</h3>
              </Modal.Header>
              <Modal.Body>
                <Container>
                  <Row>
                    <Button onClick={this.killPcConfirm} variant="danger">
                      Yes, {this.props.character.firstName}{" "}
                      {this.props.character.lastName} died a glorious death in battle.
                    </Button>
                  </Row>
                  <Row>
                    <Button onClick={this.handleKillPCClose} variant="link">
                      ....Nevermind
                    </Button>
                  </Row>
                </Container>
              </Modal.Body>
            </Modal>

            <Modal show={this.state.showLevelUpModal} onHide={this.handleLevelUpClose}>
              <AddLevelForm
                handleClose={this.handleLevelUpClose}
                character={this.props.character}
                subclasses={this.props.subclasses}
                pcSubclasses={this.props.pcSubclasses}
              />
            </Modal>
            <Container fluid>
              <Row>
                <Col>
                  <h1>
                    {`${this.props.character.firstName}${
                      this.props.character.lastName === ""
                        ? ""
                        : " " + this.props.character.lastName
                    }${this.props.character.dead ? ": Dead" : ""}`}
                  </h1>    
                </Col>
                <Col>        
                  {this.props.pcSubclasses.filter(
                    (pcSubclass) =>
                      pcSubclass.classCharacter === this.props.characterid
                  ).length <
                    getLevel(
                      this.props.missions.filter((mission) =>
                        mission.characters.some(
                          (character) => character === this.props.characterid
                        )
                      ).length +
                        this.props.missions.filter(
                          (mission) => mission.dm === this.props.characterid
                        ).length
                    ) && this.props.character.creator === this.props.userid ? (
                    <Button variant="success" className="margin-right" onClick={this.handleLevelUpShow}>
                      Level Up!
                    </Button>
                  ) : null}
                  {this.props.character.creator === this.props.userid ? (
                    <Button onClick={this.handleKillPCShow} variant="danger">
                      Character Died
                    </Button>
                  ) : null}
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>
                    Race:{" "}
                    {
                      this.props.races.find(
                        (race) => race.id === this.props.character.raceName
                      ).raceName
                    }
                  </p>
                  <p>Armor Class: {this.props.character.armorClass}</p>
                  <p>Passive Perception: {this.props.character.passivePerception}</p>
                  <p>Max HP: {this.props.character.maxHp}</p>
                  <p>
                  Class:{" "}
                  <ClassBuilder
                    pcClasses={this.props.pcSubclasses.filter(
                      (pcSubclass) =>
                        pcSubclass.classCharacter === this.props.characterid
                    )}
                    subclasses={this.props.subclasses}
                  />
                  </p>
                  <p>
                  Earned:{" "}
                  <TotalEarnedMoney
                    transactions={this.props.transactions.filter((transaction) =>
                      transaction.characters.some(
                        (character) => character === this.props.characterid
                      )
                    )}
                  />
                  </p>
                  <p>
                  Spent:{" "}
                  <TotalSpentMoney
                    transactions={this.props.transactions.filter((transaction) =>
                      transaction.characters.some(
                        (character) => character === this.props.characterid
                      )
                    )}
                  />
                  </p>
                  <p>
                  Balance:{" "}
                  <TotalBalanceMoney
                    transactions={this.props.transactions.filter((transaction) =>
                      transaction.characters.some(
                        (character) => character === this.props.characterid
                      )
                    )}
                  />
                  </p>
                  <p>Downtime Availble: {getDowntimeDays(
                      this.props.missions.filter(mission => mission.visable === true),
                      this.props.character,
                      this.props.downtime,
                      this.props.pcSubclasses.filter(
                        (pcLevel) => pcLevel.classCharacter === this.props.character.id
                      )
                    )}</p>
                </Col>
                <Col>
                  <ClassTable
                    pcClasses={this.props.pcSubclasses.filter(
                      (pcSubclass) =>
                        pcSubclass.classCharacter === this.props.characterid
                    )}
                    subclasses={this.props.subclasses}
                  />
                </Col>
              </Row>
              <Row className="margin-top">
                <Col>
                  Missions:
                  <ul className="double-column">
                    {this.props.missions
                      .filter((mission) =>
                        mission.characters.some(
                          (character) => character === this.props.characterid
                        )
                      )
                      .map((mission) => {
                        return <li key={mission.id}>{mission.name}</li>;
                    })}
                  </ul>
                </Col>
                <Col>
                  DMed:
                  <ul className="double-column">
                    {this.props.missions
                      .filter((mission) => mission.dm === this.props.characterid)
                      .map((dm) => {
                        return <li key={dm.id}>{dm.name}</li>;
                      })}
                  </ul>
                </Col>
              </Row>
            </Container>
            <TransactionsTable
              transactions={this.props.transactions.filter((transaction) =>
                transaction.characters.some(
                  (character) => character === this.props.characterid
                )
              )}
              characters={this.props.characters}
              missions={this.props.missions}
            />
            {this.props.downtime.filter(dTransaction => dTransaction.character === this.props.characterid).length === 0 ?
              null : 
              <div className="margin-top margin-bottom">
                <h3>Downtime Spent:</h3>
                <DowntimeTable 
                  characters={this.props.characters} 
                  downtime={this.props.downtime.filter(dTransaction => dTransaction.character === this.props.characterid)} 
                />
              </div>
            }
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  startSetCharacters: () => dispatch(startSetCharacters()),
  startSetPCSubclasses: () => dispatch(startSetPCSubclasses()),
  startSetMissions: () => dispatch(startSetMissions()),
  startSetRaces: () => dispatch(startSetRaces()),
  startSetSubclasses: () => dispatch(startSetSubclasses()),
  startSetTransactions: () => dispatch(startSetTransactions()),
  startSetDowntime: () => dispatch(startSetDowntime()),
  startUpdateCharacter: (id, updates) =>
    dispatch(startUpdateCharacter(id, updates)),
});

const mapStateToProps = (state, props) => ({
  characterid: parseInt(props.match.params.id),
  character: state.characters.data.find(
    (character) => character.id.toString() === props.match.params.id
  ),
  pcSubclasses: state.pcSubclasses.data,
  missions: state.missions.data,
  races: state.races.data,
  subclasses: state.subclasses.data,
  transactions: state.transactions.data,
  characters: state.characters.data,
  userid: state.auth.user.id,
  downtime: state.downtime.data,

  pcSubclassesIsLoading: state.pcSubclasses.isLoading,
  missionsIsLoading: state.missions.isLoading,
  racesIsLoading: state.races.isLoading,
  subclassesIsLoading: state.subclasses.isLoading,
  transactionsIsLoading: state.transactions.isLoading,
  charactersIsLoading: state.characters.isLoading,
  downtimeIsLoading: state.downtime.isLoading,

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayCharacterPage);
