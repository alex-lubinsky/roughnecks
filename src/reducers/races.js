import { SET_RACES, RACES_LOADING } from "../actions/actionvariables";

const racesReducerDefaultState = { data: [], isLoading: false };

export default (state = racesReducerDefaultState, action) => {
  switch (action.type) {
    case SET_RACES:
      return Object.assign({}, state, { isLoading: false, data: action.races });
    case RACES_LOADING:
      return Object.assign({}, state, { isLoading: true });
    default:
      return state;
  }
};
