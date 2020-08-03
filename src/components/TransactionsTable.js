import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaCheck } from 'react-icons/fa';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';


const TransactionsTable = (props) => {
  return (
    <Tabs defaultActiveKey="earned">
      <Tab eventKey="earned" title="Earned">
        <Container fluid>
          <Row>
            <Col>
              <table className="table-highlights width-100">
                <thead>
                  <tr>
                    <th className="width-2">Ep. #</th>
                    <th className="width-20">Mission Name</th>
                    <th className="width-20">Name</th>
                    <th className="width-2">Gold</th>
                    <th className="width-2">Silver</th>
                    <th className="width-2">Copper</th>
                    <th className="width-2">Airship Pot</th>
                    <th className="">Characters</th>
                  </tr>
                </thead>
                <tbody>
                  {props.transactions
                    .filter((transaction) => {
                      return transaction.earnedSpent === 1;
                    }).sort((a,b) => (a.episode >= b.episode) ? 1 : -1)
                    .map((transaction) => {
                      return (
                        <tr key={transaction.id} className="transaction-row">
                          <td>
                            {props.missions.find(
                              (mission) => mission.id === transaction.mission
                            ).episode
                              ? props.missions.find(
                                  (mission) => mission.id === transaction.mission
                                ).episode
                              : ""}
                          </td>
                          <td>
                            {props.missions.find(
                              (mission) => mission.id === transaction.mission
                            ).name !== "Starting Gold"
                              ? props.missions.find(
                                  (mission) => mission.id === transaction.mission
                                ).name
                              : ""}
                          </td>
                          <td>{transaction.name}</td>
                          <td>{transaction.goldPcs}</td>
                          <td>{transaction.silverPcs}</td>
                          <td>{transaction.copperPcs}</td>
                          <td>{transaction.airshipPot ? <FaCheck /> : null}</td>
                          <td>
                            <ul className="character-list">
                            {transaction.characters.map((pc) => {
                              const character = props.characters.find(
                                (character) => character.id === pc
                              );
                              return (
                                <li key={character.id}>
                                  {character.fullName}
                                </li>
                              );
                            })}
                            </ul>
                          </td>
                          <td></td>
                          <td></td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </Col>
          </Row>
        </Container>
      </Tab>
      <Tab eventKey="spent" title="Spent">
      <Container fluid>
          <Row>
            <Col>
              <table className="table-highlights width-100">
                <thead>
                  <tr>
                    <th className="width-20">Name</th>
                    <th className="width-3">Gold</th>
                    <th className="width-3">Silver</th>
                    <th className="width-3">Copper</th>
                    <th className="">Characters</th>
                  </tr>
                </thead>
                <tbody>
                  {props.transactions
                    .filter((transaction) => {
                      return transaction.earnedSpent === -1;
                    })
                    .map((transaction) => {
                      return (
                        <tr key={transaction.id} className="transaction-row">
                          <td>{transaction.name}</td>
                          <td>{transaction.goldPcs}</td>
                          <td>{transaction.silverPcs}</td>
                          <td>{transaction.copperPcs}</td>
                          <td>
                            <ul className="character-list">
                              {transaction.characters.map((pc) => {
                                const character = props.characters.find(
                                  (character) => character.id === pc
                                );
                                return (
                                  <li key={character.id}>
                                    {character.fullName}
                                  </li>
                                );
                              })}                 
                            </ul>
                          </td>
                          <td></td>
                          <td></td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </Col>
          </Row>
        </Container>
      </Tab>
    </Tabs>
  );
};

export default TransactionsTable;
