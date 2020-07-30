import React from 'react';

const DowntimeTable = (props) => {
  return(
    <table className="downtime-list mission-table">
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
            <tr key={downtime.id} className="downtime-row">
              {props.characters.filter(character => character.id === downtime.character).map(character => {
                return <td key={character.id}>{`${character.fullName}`}</td>
              })}
              <td>{downtime.numOfDaysSpent}</td>
              <td>{downtime.downtimeDisplayType}</td>
              <td className="character-race">{downtime.description}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default DowntimeTable;