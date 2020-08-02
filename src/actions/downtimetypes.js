import axios from "axios";
import { tokenConfig } from "./auth";
import { SET_DOWNTIME_TYPES, DOWNTIME_TYPES_LOADING } from "./actionvariables";

const setDowntimeTypes = (downtimeTypes) => ({
  type: SET_DOWNTIME_TYPES,
  downtimeTypes,
});

const downtimeTypesLoading = () => ({
  type: DOWNTIME_TYPES_LOADING,
});

export function startSetDowntimeTypes() {
  return (dispatch, getState) => {
    dispatch(downtimeTypesLoading());
    return axios
      .get(`/api/downtimetypes/`, tokenConfig(getState().auth.token))
      .then((res) => {
        dispatch(setDowntimeTypes(res.data));
        return res.data;
      });
  };
}
