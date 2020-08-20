//import axios  test
import axios from "axios";

//import Auth Token Function
import { tokenConfig } from "./auth";

//import variables
import {
  ADD_AIRSHIP_UPGRADE,
  SET_AIRSHIP_UPGRADE,
  AIRSHIP_UPGRADES_LOADING,
} from "../variables/actionvariables";

const setAirshipUpgrades = (airshipUpgrades) => ({
  type: SET_AIRSHIP_UPGRADE,
  airshipUpgrades,
});

const airshipUpgradesLoading = () => ({
  type: AIRSHIP_UPGRADES_LOADING,
});

export function startSetAirshipUpgrades() {
  return (dispatch, getState) => {
    dispatch(airshipUpgradesLoading());
    return axios
      .get(`/api/airshipupgrades/`, tokenConfig(getState().auth.token))
      .then((res) => {
        dispatch(setAirshipUpgrades(res.data));
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export const addAirshipUpgrade = (airshipUpgrade) => ({
  type: ADD_AIRSHIP_UPGRADE,
  airshipUpgrade,
});

export const startAddAirshipUpgrade = (airshipUpgradeData = {}) => {
  return (dispatch, getState) => {
    const {
      upgradeType = "Carlyle's Trading Network",
      fromAirshipPot = false,
      amount = 0,
      downtimeAirshipUpgrade = 1,
    } = airshipUpgradeData;

    const airshipUpgrade = { upgradeType, fromAirshipPot, amount, downtimeAirshipUpgrade };

    return axios
      .post(
        `/api/airshipupgrades/`,
        airshipUpgrade,
        tokenConfig(getState().auth.token)
      )
      .then((res) => {
        dispatch(addAirshipUpgrade(res.data));
        return res.data;
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};
