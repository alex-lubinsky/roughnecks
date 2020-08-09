import React from "react";
import { NavLink } from "react-router-dom";
import ClassBuilder from "./ClassBuilder";
import { getLevel, getDowntimeDays, getCheckmarks } from "../functions/levels";
import CharacterRowIcon from "./CharacterRowIcon";

const CharacterRow = (props) => {
  const checkmarks = getCheckmarks(
    props.missions,
    props.character,
    props.downtime
  );

  return (
    <>
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
            {`${props.character.fullName}`}
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
          />{" "}
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
        {props.missionsForMissionList
          .sort((a, b) => (a.episode > b.episode ? 1 : -1))
          .map((mission) => {
            let iconName = "";
            if (mission.dm === props.character.id) {
              iconName = "dm";
            } else if (
              mission.characters.some(
                (missionCharacters) => props.character.id === missionCharacters
              )
            ) {
              iconName = "player";
            } else {
              const levelAtTimeOfMission = props.pcSubclasses.filter(
                (level) =>
                  level.dateCreated <= mission.playedOn &&
                  level.classCharacter === props.character.id
              ).length;
              if (
                mission.playedOn >= props.character.dateCreated &&
                levelAtTimeOfMission >= mission.levelMin &&
                levelAtTimeOfMission <= mission.levelMax &&
                (props.character.dateOfDeath
                  ? props.character.dateOfDeath >= mission.playedOn
                  : true)
              ) {
                iconName = "na";
              }
            }
            return (
              <td key={mission.id} className={iconName}>
                <CharacterRowIcon iconName={iconName} />
              </td>
            );
          })}
      </tr>
      <tr className="spacer">
        <td></td>
      </tr>
    </>
  );
};

export default CharacterRow;
