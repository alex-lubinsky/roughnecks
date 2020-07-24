import React from "react";

const TransactionsTable = (props) => {
  return (
    <div>
      <p>Transactions:</p>
      <p>Earned:</p>
      <table>
        <thead>
          <tr>
            <th>Episode Number</th>
            <th>Mission Name</th>
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
      </table>
      <p>Spent:</p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gold</th>
            <th>Silver</th>
            <th>Copper</th>
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
      </table>
    </div>
  );
};

export default TransactionsTable;
