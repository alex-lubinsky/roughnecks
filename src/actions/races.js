import axios from "axios";
import { tokenConfig } from "./auth";
import { SET_RACES, RACES_LOADING } from "../variables/actionvariables";

const setRaces = (races) => ({
  type: SET_RACES,
  races,
});

const racesLoading = () => ({
  type: RACES_LOADING,
});

export function startSetRaces() {
  return (dispatch, getState) => {
    dispatch(racesLoading());
    return axios
      .get(`/api/races/`, tokenConfig(getState().auth.token))
      .then((res) => {
        dispatch(setRaces(res.data));
        return res.data;
      });
  };
}
