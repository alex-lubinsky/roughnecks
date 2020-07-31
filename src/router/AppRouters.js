import React from "react";
import { Route, Switch, Router } from "react-router-dom";
import Header from "./../components/Header";
import NotFoundPage from "../components/NotFoundPage";
import App from "../App";
import history from "../history";
import DisplayCharacterPage from "../components/DisplayCharacterPage";
import DisplayMissionPage from "../components/DisplayMissionPage";
import MissionList from "../components/MissionList";
import TransactionList from "../components/TransactionList";
import Skymall from "../components/Skymall";
import SkymallAdmin from "../components/SkymallAdmin";
import LoginForm from "../components/Login";
import PrivateRoute from "../components/PrivateRoute";
import FallenHeroes from "../components/FallenHeroes";
import SkymallAdminRoute from "../components/SkymallAdminRoute";
import DowntimeList from '../components/DowntimeList';

import { startLoadUser } from "../actions/auth";
import { connect } from "react-redux";
import ResetForm from "../components/ResetForm";
import ResetEmail from "../components/ResetEmail";

import { startSetCharacters } from "../actions/characters";
import { startSetRaces } from "../actions/races";
import { startLoadUsers } from "../actions/auth";
import { startSetSubclasses } from "../actions/subclasses";
import { startSetDowntime } from "../actions/downtime";
import { startSetMissions } from "../actions/missions";
import { startSetPCSubclasses } from "../actions/playercharacterclasses";

class AppRouter extends React.Component {
  componentDidMount() {
    this.props.startLoadUser(this.props.token);
  }

  componentDidUpdate(prevProps) {
    if (this.props.token !== prevProps.token) {
      this.props.startLoadUser(this.props.token);
    }
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <PrivateRoute exact path="/" component={App} />
            <PrivateRoute
              path="/characters/:id"
              component={DisplayCharacterPage}
            />
            <PrivateRoute
              path="/missions"
              component={MissionList}
              exact={true}
            />
            <PrivateRoute path="/missions/:id" component={DisplayMissionPage} />
            <PrivateRoute path="/transactions" component={TransactionList} />
            <PrivateRoute path="/skymall" component={Skymall} />
            <SkymallAdminRoute path="/skymalladmin" component={SkymallAdmin} />
            <PrivateRoute path="/fallen" component={FallenHeroes} />
            <PrivateRoute path="/downtime" component={DowntimeList} />
            <Route exact path="/reset" component={ResetEmail} />
            <Route path="/reset/:uid/:token/" component={ResetForm} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  startLoadUser: (token) => dispatch(startLoadUser(token)),

  startSetCharacters: () => dispatch(startSetCharacters()),
  startSetMissions: () => dispatch(startSetMissions()),
  startSetPCSubclasses: () => dispatch(startSetPCSubclasses()),
  startSetRaces: () => dispatch(startSetRaces()),
  startLoadUsers: () => dispatch(startLoadUsers()),
  startSetSubclasses: () => dispatch(startSetSubclasses()),
  startSetDowntime: () => dispatch(startSetDowntime()),
});

const mapStateToProps = (state, props) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
