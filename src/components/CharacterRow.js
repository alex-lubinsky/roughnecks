import React from 'react';
import { NavLink } from 'react-router-dom'
import ClassBuilder from './ClassBuilder';
import {getLevel, getDowntimeDays, getCheckmarks} from '../functions/levels'

const CharacterRow = (props) => {
  
  const checkmarks = getCheckmarks(props.missions, props.character) + Math.floor(props.downtime.filter(dtTransaction => {
    return (dtTransaction.downtimeType === 'TR' && dtTransaction.character === props.character.id)
  }).map(transaction => {
    return transaction.numOfDaysSpent
  }).reduce((accumulator, currentValue) => {
    return accumulator + currentValue
  }, 0) /10)

  return (
    <tr>
      <td>{props.users.find(user => user.id === props.character.creator).first_name}</td>
      <td>
        <NavLink 
          to={`/characters/${props.character.id}`} 
          activeClassName="is-active"
        >
          {`${props.character.firstName} ${props.character.lastName}`}
        </NavLink>
      </td>
      <td>{props.races.find(race => race.id === props.character.raceName).raceName}</td>
      <td>
        <ClassBuilder 
          pcClasses={props.pcSubclasses.filter(pcSubclass => pcSubclass.classCharacter === props.character.id)} 
          subclasses={props.subclasses}
        />
        {getLevel(checkmarks) > props.pcSubclasses.filter(pcSubclass => pcSubclass.classCharacter === props.character.id).length ? 
        <i className="icon-arrow-up" /> : null}
      </td>
      <td>{getLevel(checkmarks)}</td>
      <td>{checkmarks}</td>
      <td>{getDowntimeDays(props.missions, props.character, props.downtime, props.pcSubclasses.filter(pcLevel => pcLevel.classCharacter === props.character.id))}</td>
      {props.missions.map((mission) => {
        if (mission.dm === props.character.id) {
          return <td key={mission.id}><i className="icon-legal" /></td>
        } else if (mission.characters.some(missionCharacters => props.character.id === missionCharacters)) {
          return <td key={mission.id}><i className="icon-ok" /></td>
        } else {
          return <td key={mission.id}><i className="icon-remove" /></td>
        }
      })}
    </tr>
  )
}

export default CharacterRow;