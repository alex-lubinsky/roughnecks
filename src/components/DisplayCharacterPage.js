import React from "react";
import { connect } from "react-redux";
import ClassBuilder from "./ClassBuilder";
import TransactionsTable from "./TransactionsTable";
import TotalEarnedMoney from "./TotalEarnedMoney";
import TotalSpentMoney from "./TotalSpentMoney";
import TotalBalanceMoney from "./TotalBalanceMoney";
import Modal from "react-bootstrap/Modal";
import AddLevelForm from "./AddLevelForm";
import { getLevel, getCheckmarks } from "../functions/levels";
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
import { startSetDowntime } from "../actions/downtime";
import DowntimeTable from "./DowntimeTable";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import { getDowntimeDays } from "../functions/levels";
import ItemsOwnedTable from "./ItemsOwnedTable";
import { startSetItems } from "../actions/items";
import { startSetItemsOwned, startUpdateItemOwned} from "../actions/itemsowned";
import { startAddTransaction } from "../actions/transactions";
import { startRemoveItemOwned } from "../actions/itemsowned";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { startSetDowntimeTypes } from "../actions/downtimetypes";
import ValidationMessage from './ValidationMessage';
import { BsPencil } from 'react-icons/bs';

class DisplayCharacterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showLevelUpModal: false,
      showKillPCModal: false,
      errorMsg: {},
      qtyValid: true
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
    this.props.startSetItems();
    this.props.startSetItemsOwned();
    this.props.startSetDowntimeTypes();
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
    const date = new Date();
    this.props.startUpdateCharacter(this.props.character.id, {
      dead: true,
      dateOfDeath: `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`,
    });
    this.handleKillPCClose();
  };

  sellItem = (ownedItemId, itemId, removeSell, qty) => {
    const itemOwned = this.props.itemsOwned.find(
      (item) => ownedItemId === item.id.toString()
    );
    const item = this.props.items.find((item) => item.id.toString() === itemId);

    let errorMsg = {...this.state.errorMsg}
    if(itemOwned.qty < qty){
      errorMsg.qty = `You are trying to Sell/Remove more ${item.name} items than you have`
      this.setState({qtyValid: false, errorMsg})
      return null; 
    } else {
      this.setState({qtyValid: true, errorMsg})
    }

    if(removeSell === "sell") {
      const total = parseFloat(
        `${item.costGold}.${item.costSilver}${item.costCopper}`
      );
  
      const gold = Math.floor((qty * total) / 2);
      const silver = Math.floor(((qty * total) / 2 - gold) * 10);
      const copper = Math.floor(
        (((qty * total) / 2 - gold) * 10 - silver) * 10
      );
  
      this.props.startAddTransaction({
        name: `Sold ${item.name} (x${qty})`,
        goldPcs: gold,
        silverPcs: silver,
        copperPcs: copper,
        mission: this.props.missions.find((mission) => mission.name === "Skymall")
          .id,
        characters: [this.props.characterid],
        airshipPot: false,
        earnedSpent: 1,
      });
    } 
    
    if (itemOwned.qty === qty) {
      this.props.startRemoveItemOwned(itemOwned.id);
    } else {
      this.props.startUpdateItemOwned(itemOwned.id, {
        qty: itemOwned.qty - parseInt(qty)
      });
    }
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
        this.props.downtimeIsLoading ||
        this.props.itemsIsLoading ||
        this.props.itemsOwnedIsLoading ||
        this.props.downtimeTypesIsLoading ? <div>Loading...</div> : (
          <div>
            <Modal
              show={this.state.showKillPCModal}
              onHide={this.handleKillPCClose}
            >
              <Modal.Header closeButton>
                <h3>Are you sure?</h3>
              </Modal.Header>
              <Modal.Body>
                <Container>
                  <Row>
                    <Button onClick={this.killPcConfirm} variant="danger">
                      Yes, {this.props.character.fullName} died a glorious death
                      in battle.
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

            <Modal
              show={this.state.showLevelUpModal}
              onHide={this.handleLevelUpClose}
            >
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
                    {`${this.props.character.fullName} ${
                      this.props.character.dead ? ": Dead" : ""
                    }`}
                  </h1>
                </Col>
                <Col>
                  {this.props.pcSubclasses.filter(
                    (pcSubclass) =>
                      pcSubclass.classCharacter === this.props.characterid
                  ).length <
                    getLevel(
                      getCheckmarks(
                        this.props.missions,
                        this.props.character,
                        this.props.downtime
                      )
                    ) && this.props.character.creator === this.props.userid ? (
                    <Button
                      variant="success"
                      className="margin-right"
                      onClick={this.handleLevelUpShow}
                    >
                      Level Up!
                    </Button>
                  ) : null}
                  {this.props.character.creator === this.props.userid &&
                  this.props.character.dead === false ? (
                    <Button onClick={this.handleKillPCShow} variant="danger">
                      Character Died
                    </Button>
                  ) : null}
                </Col>
              </Row>
            </Container>
            <Tabs defaultActiveKey="pcLevels">
              <Tab eventKey="pcLevels" title="Levels">
                <Container fluid className="tab-margin">
                  <Row>
                    <Col>
                      {this.props.character.creator === this.props.userid ?
                        <span className="float-right margin-right-100">
                          <Button variant="link">
                            <BsPencil />
                          </Button>
                        </span>
                      : null}
                      <p>
                        Race:{" "}
                        {
                          this.props.races.find(
                            (race) => race.id === this.props.character.raceName
                          ).raceName
                        }
                      </p>
                      <p>Armor Class: {this.props.character.armorClass}</p>
                      <p>
                        Passive Perception:{" "}
                        {this.props.character.passivePerception}
                      </p>
                      <p>Max HP: {this.props.character.maxHp}</p>
                      <p>
                        Class:{" "}
                        <ClassBuilder
                          pcClasses={this.props.pcSubclasses.filter(
                            (pcSubclass) =>
                              pcSubclass.classCharacter ===
                              this.props.characterid
                          )}
                          subclasses={this.props.subclasses}
                        />
                      </p>
                      <p>
                        Earned:{" "}
                        <TotalEarnedMoney
                          transactions={this.props.transactions.filter(
                            (transaction) =>
                              transaction.characters.some(
                                (character) =>
                                  character === this.props.characterid
                              )
                          )}
                        />
                      </p>
                      <p>
                        Spent:{" "}
                        <TotalSpentMoney
                          transactions={this.props.transactions.filter(
                            (transaction) =>
                              transaction.characters.some(
                                (character) =>
                                  character === this.props.characterid
                              )
                          )}
                        />
                      </p>
                      <p>
                        Balance:{" "}
                        <TotalBalanceMoney
                          transactions={this.props.transactions.filter(
                            (transaction) =>
                              transaction.characters.some(
                                (character) =>
                                  character === this.props.characterid
                              )
                          )}
                        />
                      </p>
                      <p>
                        Downtime Availble:{" "}
                        {getDowntimeDays(
                          this.props.missions.filter(
                            (mission) => mission.visable === true
                          ),
                          this.props.character,
                          this.props.downtime,
                          this.props.pcSubclasses.filter(
                            (pcLevel) =>
                              pcLevel.classCharacter === this.props.character.id
                          )
                        )}
                      </p>
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
                </Container>
              </Tab>
              <Tab eventKey="missions" title="Missions">
                <Container fluid className="tab-margin">
                  <Row>
                    <Col>
                      Missions:
                      <ul className="double-column padding-left">
                        {this.props.missions
                          .filter((mission) =>
                            mission.characters.some(
                              (character) =>
                                character === this.props.characterid
                            )
                          )
                          .map((mission) => {
                            return <li key={mission.id}>{mission.name}</li>;
                          })}
                      </ul>
                    </Col>
                    <Col>
                      DMed:
                      <ul className="double-column padding-left">
                        {this.props.missions
                          .filter(
                            (mission) => mission.dm === this.props.characterid
                          )
                          .map((dm) => {
                            return <li key={dm.id}>{dm.name}</li>;
                          })}
                      </ul>
                    </Col>
                  </Row>
                </Container>
              </Tab>
              <Tab eventKey="transactions" title="Transactions">
                <Container fluid className="tab-margin">
                  <Row>
                    <Col>
                      <TransactionsTable
                        transactions={this.props.transactions.filter(
                          (transaction) =>
                            transaction.characters.some(
                              (character) =>
                                character === this.props.characterid
                            )
                        )}
                        characters={this.props.characters}
                        missions={this.props.missions}
                      />
                    </Col>
                  </Row>
                </Container>
              </Tab>
              <Tab eventKey="downtime" title="Downtime">
                <Container fluid className="tab-margin">
                  <Row>
                    <Col>
                      <DowntimeTable
                        characters={this.props.characters}
                        downtime={this.props.downtime.filter(
                          (dTransaction) =>
                            dTransaction.character === this.props.characterid
                        )}
                        downtimeTypes={this.props.downtimeTypes}
                      />
                    </Col>
                  </Row>
                </Container>
              </Tab>
              <Tab eventKey="itemsOwned" title="Items">
                <Container fluid className="tab-margin">
                  <Row>
                    <Col>
                      <ValidationMessage
                        valid={this.state.qtyValid}
                        message={this.state.errorMsg.qty}
                      />
                      <ItemsOwnedTable
                        items={this.props.items}
                        groupedItemsOwned={this.props.itemsOwned
                          .filter((item) => item.character === this.props.characterid)}
                        onClick={this.sellItem}
                        hasSellPermission={
                          this.props.user.id === this.props.character.creator ||
                          this.props.user.is_staff
                            ? true
                            : false
                        }
                      />
                    </Col>
                  </Row>
                </Container>
              </Tab>
            </Tabs>
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
  startSetItems: () => dispatch(startSetItems()),
  startSetItemsOwned: () => dispatch(startSetItemsOwned()),
  startAddTransaction: (transaction) =>
    dispatch(startAddTransaction(transaction)),
  startRemoveItemOwned: (id) => dispatch(startRemoveItemOwned(id)),
  startSetDowntimeTypes: () => dispatch(startSetDowntimeTypes()),
  startUpdateItemOwned: (id, updates) => dispatch(startUpdateItemOwned(id, updates)),
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
  items: state.items.data,
  itemsOwned: state.itemsOwned.data,
  user: state.auth.user,
  downtimeTypes: state.downtimeTypes.data,

  pcSubclassesIsLoading: state.pcSubclasses.isLoading,
  missionsIsLoading: state.missions.isLoading,
  racesIsLoading: state.races.isLoading,
  subclassesIsLoading: state.subclasses.isLoading,
  transactionsIsLoading: state.transactions.isLoading,
  charactersIsLoading: state.characters.isLoading,
  downtimeIsLoading: state.downtime.isLoading,
  itemsOwnedIsLoading: state.itemsOwned.isLoading,
  itemsIsLoading: state.items.isLoading,
  downtimeTypesIsLoading: state.downtimeTypes.isLoading,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayCharacterPage);
