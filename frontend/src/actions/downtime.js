import axios from "axios";
import { tokenConfig } from './auth';
import { SET_DOWNTIME, ADD_DOWNTIME, DOWNTIME_LOADING } from './actionvariables';

const setDowntime = (downtime) => ({
  type: SET_DOWNTIME,
  downtime
});

const downtimeLoading = () => ({
  type: DOWNTIME_LOADING
});

export function startSetDowntime() {
  return (dispatch, getState) => {
    dispatch(downtimeLoading());
    return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/downtime/`, tokenConfig(getState().auth.token))
    .then(res => {
      dispatch(setDowntime(res.data));
      return(res.data);
    }).catch(err => {
      console.log(err);
    });
  };
};

export const addDowntime = (downtime) => ({
  type: ADD_DOWNTIME,
  downtime
});

export const startAddDowntime = (downtimeData = {}) => {
  return (dispatch, getState) => {
    const {
        description = "",
        downtimeType = "MC",
        character = 0,
        numOfDaysSpent = 0,
    } = downtimeData;

    const downtime = {description, downtimeType, character, numOfDaysSpent};

    return axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/downtime/`, downtime, tokenConfig(getState().auth.token))
    .then(res => {
      dispatch(addDowntime(res.data));
      return res.data;
    }).catch(err => {
      console.log(err);
    })
  };
};