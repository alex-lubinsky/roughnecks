import axios from "axios";
import { tokenConfig } from "./auth";
import { SET_DOWNTIME_JOBS, DOWNTIME_JOBS_LOADING } from "../variables/actionvariables";

const setDowntimeJobs = (downtimeJobs) => ({
  type: SET_DOWNTIME_JOBS,
  downtimeJobs,
});

const downtimeJobsLoading = () => ({
  type: DOWNTIME_JOBS_LOADING,
});

export function startSetDowntimeJobs() {
  return (dispatch, getState) => {
    dispatch(downtimeJobsLoading());
    return axios
      .get(`/api/downtimejobs/`, tokenConfig(getState().auth.token))
      .then((res) => {
        dispatch(setDowntimeJobs(res.data));
        return res.data;
      });
  };
}
