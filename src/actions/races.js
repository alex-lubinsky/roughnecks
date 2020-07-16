import axios from "axios";
import { tokenConfig } from './auth';
import { SET_RACES, RACES_LOADING } from './actionvariables';

const setRaces = (races) => ({
  type: SET_RACES,
  races
});

const racesLoading = () => ({
  type: RACES_LOADING
});

export function startSetRaces() {
  return (dispatch, getState) => {
    dispatch(racesLoading());
    return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/races/`, tokenConfig(getState().auth.token))
    .then(res => {
      dispatch(setRaces(res.data));
      return(res.data);
    });
  };
};
