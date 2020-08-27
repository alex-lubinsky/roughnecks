import React from "react";
import { startSetMissions } from "../actions/missions";
import { startSetPCSubclasses } from "../actions/playercharacterclasses";
import { connect } from "react-redux";
import HeroTable from "./HeroTable";
import { startSetCharacters } from "../actions/characters";
import { startSetRaces } from "../actions/races";
import { startLoadUsers } from "../actions/auth";
import { startSetSubclasses } from "../actions/subclasses";
import { startSetDowntime } from "../actions/downtime";

class CheckmarkDashboard extends React.Component {
  componentDidMount() {
    this.props.startSetCharacters();
    this.props.startSetMissions();
    this.props.startSetPCSubclasses();
    this.props.startSetRaces();
    this.props.startLoadUsers();
    this.props.startSetDowntime();
    this.props.startSetSubclasses();
  }

  render() {
    return (
      <div className="div-margin-sm">
        <h1>Hall of Heroes</h1>
        {this.props.charactersIsLoading ||
        this.props.missionIsLoading ||
        this.props.pcSubclassesIsLoading ||
        this.props.racesIsLoading ||
        this.props.usersIsLoading ||
        this.props.subclassesIsLoading ||
        this.props.downtimeIsLoading ? <div>Loading Dashboard...</div> : (
          <HeroTable
            characters={this.props.characters}
            missions={this.props.missions}
            pcSubclasses={this.props.pcSubclasses}
            races={this.props.races}
            users={this.props.users}
            subclasses={this.props.subclasses}
            downtime={this.props.downtime}
            fallen={this.props.fallen}
            totalPages={Math.ceil(
              this.props.missions.filter((mission) => mission.visable === true)
                .length / 10
            )}
          />
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  startSetCharacters: () => dispatch(startSetCharacters()),
  startSetMissions: () => dispatch(startSetMissions()),
  startSetPCSubclasses: () => dispatch(startSetPCSubclasses()),
  startSetRaces: () => dispatch(startSetRaces()),
  startLoadUsers: () => dispatch(startLoadUsers()),
  startSetSubclasses: () => dispatch(startSetSubclasses()),
  startSetDowntime: () => dispatch(startSetDowntime()),
});

const mapStateToProps = (state, props) => ({
  missions: state.missions.data,
  characters: state.characters.data,
  pcSubclasses: state.pcSubclasses.data,
  races: state.races.data,
  users: state.users.data,
  subclasses: state.subclasses.data,
  downtime: state.downtime.data,
  missionIsLoading: state.missions.isLoading,
  charactersIsLoading: state.missions.isLoading,
  pcSubclassesIsLoading: state.pcSubclasses.isLoading,
  racesIsLoading: state.races.isLoading,
  usersIsLoading: state.users.isLoading,
  subclassesIsLoading: state.subclasses.isLoading,
  downtimeIsLoading: state.downtime.isLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckmarkDashboard);
