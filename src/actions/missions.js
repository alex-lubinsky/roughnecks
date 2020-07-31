import axios from "axios";
import { tokenConfig } from "./auth";
import {
  ADD_MISSION,
  SET_MISSIONS,
  REMOVE_MISSION,
  EDIT_MISSION,
  MISSIONS_LOADING,
} from "./actionvariables";

export const addMission = (mission) => ({
  type: ADD_MISSION,
  mission,
});

export const startAddMission = (missionData = {}) => {
  return (dispatch, getState) => {
    const {
      name = "",
      dm = "",
      characters = [],
      playedOn = "",
      episode = 1,
      levelMin = 1,
      levelMax = 1,
    } = missionData;

    const mission = {
      name,
      dm,
      characters,
      playedOn,
      episode,
      levelMin,
      levelMax,
    };

    return axios
      .post(`/api/missions/`, mission, tokenConfig(getState().auth.token))
      .then((res) => {
        dispatch(addMission(res.data));
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const setMissions = (missions) => ({
  type: SET_MISSIONS,
  missions,
});

const missionLoading = () => ({
  type: MISSIONS_LOADING,
});

export const startSetMissions = () => {
  return (dispatch, getState) => {
    dispatch(missionLoading());
    return axios
      .get(`/api/missions/`, tokenConfig(getState().auth.token))
      .then((res) => {
        dispatch(setMissions(res.data));
        return res.data;
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};

export const removeMission = (id) => ({
  type: REMOVE_MISSION,
  id,
});

export function startRemoveMission({ id } = {}) {
  return (dispatch, getState) => {
    return axios
      .delete(`/api/missions/${id}/`, tokenConfig(getState().auth.token))
      .then((res) => {
        dispatch(removeMission(id));
      });
  };
}

export const editMission = (id, updates) => ({
  type: EDIT_MISSION,
  id,
  updates,
});

export const startEditMission = (id, updates) => {
  return (dispatch, getState) => {
    return axios
      .put(`/api/missions/${id}/`, updates, tokenConfig(getState().auth.token))
      .then((res) => {
        dispatch(editMission(id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
