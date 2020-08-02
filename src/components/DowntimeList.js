import React from 'react';
import DowntimeTable from './DowntimeTable';
import { connect } from "react-redux";
import { startSetCharacters } from '../actions/characters';
import { startSetDowntime } from '../actions/downtime';
import { startSetDowntimeTypes } from '../actions/downtimetypes';

class DowntimeList extends React.Component {

  componentDidMount() {
    this.props.startSetCharacters();
    this.props.startSetDowntime();
    this.props.startSetDowntimeTypes();
  }

  render() {
    return (
      <div className="div-margin-sm">
        <h1>Downtime Spent</h1>
        {this.props.charactersIsLoading || this.props.downtimeIsLoading || this.props.downtimeTypesIsLoading ? null :
          <DowntimeTable downtime={this.props.downtime} characters={this.props.characters} downtimeTypes={this.props.downtimeTypes}/>
        }
      </div>
    )
  }
  
}

const mapDispatchToProps = (dispatch, props) => ({
  startSetCharacters: () => dispatch(startSetCharacters()),
  startSetDowntime: () => dispatch(startSetDowntime()),
  startSetDowntimeTypes: () => dispatch(startSetDowntimeTypes()),
});

const mapStateToProps = (state, props) => ({
  characters: state.characters.data,
  downtime: state.downtime.data,
  downtimeTypes: state.downtimeTypes.data,

  charactersIsLoading: state.characters.isLoading,
  downtimeIsLoading: state.downtime.isLoading,
  downtimeTypesIsLoading: state.downtimeTypes.isLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(DowntimeList)