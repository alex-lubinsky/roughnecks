import React from "react";
import CharacterRow from "./CharacterRow";
import MissionColumn from "./MissionColumn";
import Table from "react-bootstrap/Table";

const HeroTable = (props) => {
  return (
    <Table striped bordered size="sm">
      <thead>
        <tr>
          <th>Creator</th>
          <th>Name</th>
          <th>Race</th>
          <th>Class</th>
          <th>LVL</th>
          <th>Checks</th>
          <th>Downtime Available</th>
          {props.missions
            .filter((mission) => mission.visable === true)
            .map((mission) => {
              return <MissionColumn key={mission.id} {...mission} />;
            })}
        </tr>
      </thead>
      <tbody>
        {props.characters
          .filter((character) => {
            return character.dead === props.fallen;
          })
          .map((character) => {
            return (
              <CharacterRow
                key={character.id}
                character={character}
                missions={props.missions.filter(
                  (mission) => mission.visable === true
                )}
                pcSubclasses={props.pcSubclasses}
                races={props.races}
                users={props.users}
                subclasses={props.subclasses}
                downtime={props.downtime}
              />
            );
          })}
      </tbody>
    </Table>
  );
};

export default HeroTable;
