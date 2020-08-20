import React from "react";
import DowntimeTable from "./DowntimeTable";
import { connect } from "react-redux";
import { startSetCharacters } from "../actions/characters";
import { startSetDowntime } from "../actions/downtime";
import { startSetDowntimeTypes } from "../actions/downtimetypes";
import Modal from "react-bootstrap/Modal";
import EditDowntimeForm from './EditDowntimeForm';


class DowntimeList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showEditDowntimeModal: false,
      downtimeSelected: '',
    }
  }

  handleEditDowntimeModalClose = () => this.setState({showEditDowntimeModal : false});
  handleEditDowntimeModalShow = () => this.setState({showEditDowntimeModal : true});

  selectDowntime = (dt) => {
    this.setState({downtimeSelected : dt}, this.handleEditDowntimeModalShow);
  }

  componentDidMount() {
    this.props.startSetCharacters();
    this.props.startSetDowntime();
    this.props.startSetDowntimeTypes();
  }

  render() {
    return (
      <>
        <Modal
          show={this.state.showEditDowntimeModal}
          onHide={this.handleEditDowntimeModalClose}
        >
          <EditDowntimeForm handleClose={this.handleEditDowntimeModalClose} downtime={this.state.downtimeSelected}/>
        </Modal>


        <div className="div-margin-sm">
          <h1>Downtime Spent</h1>
          {this.props.charactersIsLoading ||
          this.props.downtimeIsLoading ||
          this.props.downtimeTypesIsLoading ? null : (
            <DowntimeTable
              downtime={this.props.downtime}
              characters={this.props.characters}
              downtimeTypes={this.props.downtimeTypes}
              user={this.props.user}
              selectDowntime={this.selectDowntime}
            />
          )}
        </div>
      </>
    );
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
  user: state.auth.user,

  charactersIsLoading: state.characters.isLoading,
  downtimeIsLoading: state.downtime.isLoading,
  downtimeTypesIsLoading: state.downtimeTypes.isLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(DowntimeList);
