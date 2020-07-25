import React from "react";
import { NavLink } from "react-router-dom";
import ClassBuilder from "./ClassBuilder";
import { getLevel, getDowntimeDays, getCheckmarks } from "../functions/levels";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const CharacterRow = (props) => {
  const checkmarks =
    getCheckmarks(props.missions, props.character) +
    Math.floor(
      props.downtime
        .filter((dtTransaction) => {
          return (
            dtTransaction.downtimeType === "TR" &&
            dtTransaction.character === props.character.id
          );
        })
        .map((transaction) => {
          return transaction.numOfDaysSpent;
        })
        .reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0) / 10
    );

  return (
    <tr className="character-row">
      <td>
        {
          props.users.find((user) => user.id === props.character.creator)
            .first_name
        }
      </td>
      <td>
        <NavLink
          to={`/characters/${props.character.id}`}
          activeClassName="is-active"
        >
          {`${props.character.firstName} ${props.character.lastName}`}
        </NavLink>
      </td>
      <td>
        {
          props.races.find((race) => race.id === props.character.raceName)
            .raceName
        }
      </td>
      <td>
        <ClassBuilder
          pcClasses={props.pcSubclasses.filter(
            (pcSubclass) => pcSubclass.classCharacter === props.character.id
          )}
          subclasses={props.subclasses}
        />
        {" "}
        {getLevel(checkmarks) >
        props.pcSubclasses.filter(
          (pcSubclass) => pcSubclass.classCharacter === props.character.id
        ).length ? (
          <i className="icon-arrow-up" />
        ) : null}
      </td>
      <td>{getLevel(checkmarks)}</td>
      <td>{checkmarks}</td>
      <td>
        {getDowntimeDays(
          props.missions,
          props.character,
          props.downtime,
          props.pcSubclasses.filter(
            (pcLevel) => pcLevel.classCharacter === props.character.id
          )
        )}
      </td>
      {props.missions.sort((a,b) => (a.episode > b.episode) ? 1 : -1).map((mission) => {
        let iconName = ""
        if (mission.dm === props.character.id) {
          iconName = "icon-legal"
        } else if (
          mission.characters.some(
            (missionCharacters) => props.character.id === missionCharacters
          )
        ) {
          iconName = "icon-ok"
        } else {
          iconName = "icon-remove"
        }
        return (
          <td key={mission.id}>
            <OverlayTrigger
              key={mission.id}
              placement='top'
              overlay={
                <Tooltip id={`${mission.id}`}>
                  {`Ep ${mission.episode}: ${mission.name}`}
                </Tooltip>
              }
              >
                <NavLink to={`/missions/${mission.id}`}><i className={iconName} /></NavLink>
              </OverlayTrigger>              
          </td>
        );
      })}
    </tr>
  );
};

export default CharacterRow;
