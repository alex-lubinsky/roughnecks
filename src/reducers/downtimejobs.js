import { SET_DOWNTIME_JOBS, DOWNTIME_JOBS_LOADING } from "../variables/actionvariables";

const downtimeJobsReducerDefaultState = { data: [], isLoading: false };

export default (state = downtimeJobsReducerDefaultState, action) => {
  switch (action.type) {
    case SET_DOWNTIME_JOBS:
      return Object.assign({}, state, { isLoading: false, data: action.downtimeJobs });
    case DOWNTIME_JOBS_LOADING:
      return Object.assign({}, state, { isLoading: true });
    default:
      return state;
  }
};
