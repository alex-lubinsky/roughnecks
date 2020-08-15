import React from "react";

const DowntimeTable = (props) => {
  return (
    <table className="table-highlights width-100">
      <thead>
        <tr>
          <th>Character</th>
          <th>Days Spent</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {props.downtime.map((downtime) => {
          return (
            <tr key={downtime.id} className="downtime-row">
              {props.characters
                .filter((character) => character.id === downtime.character)
                .sort((a,b) => {
                  return a.creationDate > b.creationDate ? 1 : -1
                })
                .map((character) => {
                  return <td key={character.id}>{`${character.fullName}`}</td>;
                })}
              <td>{downtime.numOfDaysSpent}</td>
              <td>
                {
                  props.downtimeTypes.find(
                    (dtt) => dtt.id === downtime.downtimeType
                  ).name
                }
              </td>
              <td className="width-10">{downtime.description}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DowntimeTable;
