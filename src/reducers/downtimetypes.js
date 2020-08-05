import { SET_DOWNTIME_TYPES, DOWNTIME_TYPES_LOADING } from "../variables/actionvariables";

const downtimeTypesReducerDefaultState = { data: [], isLoading: false };

export default (state = downtimeTypesReducerDefaultState, action) => {
  switch (action.type) {
    case SET_DOWNTIME_TYPES:
      return Object.assign({}, state, { isLoading: false, data: action.downtimeTypes });
    case DOWNTIME_TYPES_LOADING:
      return Object.assign({}, state, { isLoading: true });
    default:
      return state;
  }
};
