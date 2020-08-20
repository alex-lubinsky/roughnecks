import {
  SET_DOWNTIME,
  ADD_DOWNTIME,
  DOWNTIME_LOADING,
  UPDATE_DOWNTIME,
} from "../variables/actionvariables";

const downtimeReducerDefaultState = { data: [], isLoading: false };

export default (state = downtimeReducerDefaultState, action) => {
  switch (action.type) {
    case ADD_DOWNTIME:
      return Object.assign({}, state, {
        data: [...state.data, action.downtime],
      });
    case SET_DOWNTIME:
      return Object.assign({}, state, {
        isLoading: false,
        data: action.downtime,
      });
    case UPDATE_DOWNTIME:
      return Object.assign({}, state, {
        data: state.data.map((downtime) => {
          if (downtime.id === action.id) {
            return {
              ...downtime,
              ...action.updates,
            };
          } else {
            return downtime;
          }
        }),
      });
    case DOWNTIME_LOADING:
      return Object.assign({}, state, { isLoading: true });
    default:
      return state;
  }
};
