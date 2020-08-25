import axios from "axios";
import { tokenConfig } from "./auth";
import {
  SET_DOWNTIME,
  ADD_DOWNTIME,
  DOWNTIME_LOADING,
  REMOVE_DOWNTIME,
} from "../variables/actionvariables";

const setDowntime = (downtime) => ({
  type: SET_DOWNTIME,
  downtime,
});

const downtimeLoading = () => ({
  type: DOWNTIME_LOADING,
});

export function startSetDowntime() {
  return (dispatch, getState) => {
    dispatch(downtimeLoading());
    return axios
      .get(`/api/downtime/`, tokenConfig(getState().auth.token))
      .then((res) => {
        dispatch(setDowntime(res.data));
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export const addDowntime = (downtime) => ({
  type: ADD_DOWNTIME,
  downtime,
});

export const startAddDowntime = (downtimeData = {}) => {
  return (dispatch, getState) => {
    const {
      description = "",
      downtimeType = 2,
      character = 0,
      numOfDaysSpent = 0,
    } = downtimeData;

    const downtime = { description, downtimeType, character, numOfDaysSpent };

    return axios
      .post(`/api/downtime/`, downtime, tokenConfig(getState().auth.token))
      .then((res) => {
        dispatch(addDowntime(res.data));
        return res.data;
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};


export const removeDowntime = (id) => ({
  type: REMOVE_DOWNTIME,
  id,
});

export function startRemoveDowntime({ id } = {}) {
  return (dispatch, getState) => {
    return axios
      .delete(`/api/downtime/${id}/`, tokenConfig(getState().auth.token))
      .then((res) => {
        dispatch(removeDowntime(id));
      }).catch(err => {
        console.log(err.response)
      })
  };
}