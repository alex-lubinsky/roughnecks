import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaCheck } from 'react-icons/fa';

const TransactionsTable = (props) => {
  return (
    <Container fluid>
      <h3>Transactions:</h3>
      <Row md={1} xl={2} lg={1} sm={1} xs={1}>
        <Col>
          <h4>Earned:</h4>
          <table className="transaction-list transaction-table">
            <thead>
              <tr>
                <th className="episode-number">Ep. #</th>
                <th className="character-class">Mission Name</th>
                <th className="character-class">Name</th>
                <th className="checks">Gold</th>
                <th className="checks">Silver</th>
                <th className="checks">Copper</th>
                <th className="checks">Airship Pot</th>
                <th className="">Characters</th>
              </tr>
            </thead>
            <tbody>
              {props.transactions
                .filter((transaction) => {
                  return transaction.earnedSpent === 1;
                })
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
                              {character.firstName} {character.lastName}
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
        <Col>
          <h4>Spent:</h4>
          <table className="transaction-list transaction-table">
            <thead>
              <tr>
                <th className="character-class">Name</th>
                <th className="lvl">Gold</th>
                <th className="lvl">Silver</th>
                <th className="lvl">Copper</th>
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
                                {character.firstName} {character.lastName}
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
  );
};

export default TransactionsTable;
