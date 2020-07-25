import React from 'react';

const DowntimeTable = (props) => {
  return(
    <table>
      <thead>
        <tr>
          <th>Character</th>
          <th>Days Spent</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {props.downtime.map(downtime => {
          return(
            <tr key={downtime.id}>
              {props.characters.filter(character => character.id === downtime.character).map(character => {
                return <td key={character.id}>{`${character.firstName} ${character.lastName}`}</td>
              })}
              <td>{downtime.numOfDaysSpent}</td>
              <td>{downtime.downtimeType}</td>
              <td>{downtime.description}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default DowntimeTable;