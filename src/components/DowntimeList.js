import React from 'react';
import DowntimeTable from './DowntimeTable';
import { connect } from "react-redux";
import { startSetCharacters } from '../actions/characters';
import { startSetDowntime } from '../actions/downtime';

class DowntimeList extends React.Component {

  componentDidMount() {
    this.props.startSetCharacters();
    this.props.startSetDowntime();
  }

  render() {
    return (
      <div className="div-margin-sm">
        <h1>Downtime Spent</h1>
        {this.props.charactersIsLoading || this.props.downtimeIsLoading ? null :
          <DowntimeTable downtime={this.props.downtime} characters={this.props.characters}/>
        }
      </div>
    )
  }
  
}

const mapDispatchToProps = (dispatch, props) => ({
  startSetCharacters: () => dispatch(startSetCharacters()),
  startSetDowntime: () => dispatch(startSetDowntime()),
});

const mapStateToProps = (state, props) => ({
  characters: state.characters.data,
  downtime: state.downtime.data,

  charactersIsLoading: state.characters.isLoading,
  downtimeIsLoading: state.downtime.isLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(DowntimeList)