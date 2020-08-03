import React from "react";
import CharacterRow from "./CharacterRow";
import MissionColumn from './MissionColumn';
import Pagination from 'react-bootstrap/Pagination'

class HeroTable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      active: 1,
      items: [],
    }
  }
  
  componentDidMount() {
    this.getItems()
  }

  onClick = (e) => {
    const active = parseInt(e.target.getAttribute("name"));
    this.setState({active}, this.getItems)
  }
  
  getItems = () => {
    let itemsForState = []
    for (let number = 1; number <= this.props.totalPages; number++) {
      itemsForState.push(
        <Pagination.Item key={number} onClick={this.onClick} name={number} active={number === this.state.active}>
          {number}
        </Pagination.Item>,
      );
    }
    this.setState({items: itemsForState});
  }

  render() {
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
            {this.props.missions.filter(
              mission => (mission.episode >= 1+(10*(this.state.active-1)) && mission.episode <= 10+(10*(this.state.active-1))))
              .sort((a,b) => (a.episode > b.episode) ? 1 : -2).map(mission => {
              return <MissionColumn key={mission.id} mission={mission} />
            })}
            {[0,1,2,3,4,5,6,7,8,9].slice(0+this.props.missions.filter(
              mission => (mission.episode >= 1+(10*(this.state.active-1)) && mission.episode <= 10+(10*(this.state.active-1)))).length).map(num => {
                return <th key={num} className="width-4"></th>
              })}
          </tr>
        </thead>
        <tbody className='checkmark-dashboard'>
          {this.props.characters
            .filter((character) => {
              return character.dead === this.props.fallen;
            })
            .sort((a,b) => (a.fullName > b.fullName) ? 1 : -1).map((character) => {
              return (
                <CharacterRow
                  key={character.id}
                  character={character}
                  missionsForMissionList={this.props.missions.filter(
                    (mission) => (mission.episode >= 1+(10*(this.state.active-1)) && mission.episode <= 10+(10*(this.state.active-1)))
                  ).sort((a,b) => (a.episode > b.episode) ? 1 : -2)}
                  missions={this.props.missions.filter(mission => mission.visable === true)}
                  pcSubclasses={this.props.pcSubclasses}
                  races={this.props.races}
                  users={this.props.users}
                  subclasses={this.props.subclasses}
                  downtime={this.props.downtime}
                />
              );
            })}
        </tbody>
      </table>
      <div className="hero-pagination">
        <Pagination size="sm">{this.state.items}</Pagination>
      </div>
      </>
    );
  }
  
};

export default HeroTable;
