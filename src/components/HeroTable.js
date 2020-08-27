import React from "react";
import CharacterRow from "./CharacterRow";
import MissionColumn from "./MissionColumn";
import Pagination from "react-bootstrap/Pagination";

class HeroTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: this.props.totalPages,
      missionsForPagination: [],
    };
  }

  componentDidMount() {
    this.missionPagination();
  }

  onClick = (e) => {
    const active = parseInt(e.target.getAttribute("name"));
    this.setState({ active }, this.missionPagination);
  };

  missionPagination = () => {
    let missionsForPagination = [];
    for (let number = 1; number <= this.props.totalPages; number++) {
      missionsForPagination.push(
        <Pagination.Item
          key={number}
          onClick={this.onClick}
          name={number}
          active={number === this.state.active}
        >
          {number}
        </Pagination.Item>
      );
    }
    this.setState({ missionsForPagination });
  };

  render() {
    const heroTiers = [
      {name: "Masters of the World (Level 17 - 20)", minLevel: 17, maxLevel: 20, retired: false},
      {name: "Masters of the Realm (Level 11 - 16)", minLevel: 11, maxLevel: 16, retired: false},
      {name: "Heroes of the Realm (Level 5 - 10)", minLevel: 5, maxLevel: 10, retired: false},
      {name: "Local Heroes (Level 1 - 4)", minLevel: 1, maxLevel: 4, retired: false},
      {name: "Retired Heroes", minLevel: 1, maxLevel: 20, retired: true},
    ]
    let secondRow = true
    return (
      <>
        <table className="width-100">
          <thead>
            <tr>
              <th className="width-5">Player Name</th>
              <th className="width-15">Name</th>
              <th className="width-10">Race</th>
              <th className="width-20">Class</th>
              <th className="width-3">Level</th>
              <th className="width-2">Checks</th>
              <th className="width-5">Downtime Available</th>
              {this.props.missions
                .filter(
                  (mission) =>
                    mission.episode >= 1 + 10 * (this.state.active - 1) &&
                    mission.episode <= 10 + 10 * (this.state.active - 1)
                )
                .sort((a, b) => (a.episode > b.episode ? 1 : -2))
                .map((mission) => {
                  return <MissionColumn key={mission.id} mission={mission} />;
                })}
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                .slice(
                  0 +
                    this.props.missions.filter(
                      (mission) =>
                        mission.episode >= 1 + 10 * (this.state.active - 1) &&
                        mission.episode <= 10 + 10 * (this.state.active - 1)
                    ).length
                )
                .map((num) => {
                  return <th key={num} className="width-4"></th>;
                })}
            </tr>
          </thead>
          <tbody className="">
            {heroTiers.map(heroTier => {
              return (
              this.props.characters.filter(character => {
                const level = this.props.pcSubclasses.filter(pcSubclass => pcSubclass.classCharacter === character.id).length
                return (
                  character.dead === this.props.fallen &&
                  level <= heroTier.maxLevel && 
                  level >= heroTier.minLevel &&
                  character.retired === heroTier.retired
                )}).length > 0 ?
                  <React.Fragment key={heroTier.name}>
                  <tr>
                    <td colSpan="3"><h4>{heroTier.name}</h4></td>
                  </tr>
                  
                  {this.props.characters
                    .filter((character) => {
                      const level = this.props.pcSubclasses.filter(pcSubclass => pcSubclass.classCharacter === character.id).length
                      return (
                        character.dead === this.props.fallen &&
                        level <= heroTier.maxLevel && 
                        level >= heroTier.minLevel &&
                        character.retired === heroTier.retired
                      )
                    })
                    .sort((a, b) => {
                      const aLevel = this.props.pcSubclasses.filter(pcSubclass => pcSubclass.classCharacter === a.id).length
                      const bLevel = this.props.pcSubclasses.filter(pcSubclass => pcSubclass.classCharacter === b.id).length
                      if (aLevel > bLevel) {
                        return -1
                      } else if (bLevel > aLevel) {
                        return 1
                      } else {
                        return (a.fullName > b.fullName ? 1 : -1)
                      }

                    })
                    .map((character) => {
                      secondRow = !secondRow
                      return (
                        <CharacterRow
                          key={character.id}
                          character={character}
                          missionsForMissionList={this.props.missions
                            .filter(
                              (mission) =>
                                mission.episode >= 1 + 10 * (this.state.active - 1) &&
                                mission.episode <= 10 + 10 * (this.state.active - 1)
                            )
                            .sort((a, b) => (a.episode > b.episode ? 1 : -1))}
                          missions={this.props.missions.filter(
                            (mission) => mission.visable === true
                          )}
                          pcSubclasses={this.props.pcSubclasses}
                          races={this.props.races}
                          users={this.props.users}
                          subclasses={this.props.subclasses}
                          downtime={this.props.downtime}
                          secondRow={secondRow}
                          
                        />
                      );
                    })}
                  </React.Fragment>  
                : null
              )
            })}
          </tbody>
        </table>
        <div className="hero-pagination">
          <Pagination size="sm">{this.state.missionsForPagination}</Pagination>
        </div>
      </>
    );
  }
}

export default HeroTable;
