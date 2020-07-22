import React from "react";
import Table from "react-bootstrap/Table";

const TransactionsTable = (props) => {
  return (
    <div>
      <p>Transactions:</p>
      <p>Earned:</p>
      <Table striped bordered size="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Gold</th>
            <th>Silver</th>
            <th>Copper</th>
            <th>Airship Pot</th>
            <th>Characters</th>
          </tr>
        </thead>
        <tbody>
          {props.transactions
            .filter((transaction) => {
              return transaction.earnedSpent === 1;
            })
            .map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td>{transaction.name}</td>
                  <td>{transaction.goldPcs}</td>
                  <td>{transaction.silverPcs}</td>
                  <td>{transaction.copperPcs}</td>
                  <td>{transaction.airshipPot.toString()}</td>
                  <td>
                    {transaction.characters.map((pc) => {
                      const character = props.characters.find(
                        (character) => character.id === pc
                      );
                      return (
                        <p key={character.id}>
                          {character.firstName} {character.lastName}
                        </p>
                      );
                    })}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <p>Spent:</p>
      <Table striped bordered size="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Gold</th>
            <th>Silver</th>
            <th>Copper</th>
            <th>Airship Pot</th>
            <th>Characters</th>
          </tr>
        </thead>
        <tbody>
          {props.transactions
            .filter((transaction) => {
              return transaction.earnedSpent === -1;
            })
            .map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td>{transaction.name}</td>
                  <td>{transaction.goldPcs}</td>
                  <td>{transaction.silverPcs}</td>
                  <td>{transaction.copperPcs}</td>
                  <td>{transaction.airshipPot}</td>
                  <td>
                    {transaction.characters.map((pc) => {
                      const character = props.characters.find(
                        (character) => character.id === pc
                      );
                      return (
                        <p key={character.id}>
                          {character.firstName} {character.lastName}
                        </p>
                      );
                    })}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default TransactionsTable;
