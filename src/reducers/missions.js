import {
  ADD_MISSION,
  SET_MISSIONS,
  REMOVE_MISSION,
  UPDATE_MISSION,
  MISSIONS_LOADING,
} from "../variables/actionvariables";

const missionReducerDefaultState = { data: [], isLoading: false };

export default (state = missionReducerDefaultState, action) => {
  switch (action.type) {
    case ADD_MISSION:
      return Object.assign({}, state, {
        data: [...state.data, action.mission],
      });
    case REMOVE_MISSION:
      return Object.assign({}, state, {
        data: state.data.filter(({ id }) => action.id !== id),
      });
    case UPDATE_MISSION:
      return Object.assign({}, state, {
        data: state.data.map((mission) => {
          if (mission.id === action.id) {
            return {
              ...mission,
              ...action.updates,
            };
          } else {
            return mission;
          }
        }),
      });
    case SET_MISSIONS:
      return Object.assign({}, state, {
        isLoading: false,
        data: action.missions,
      });
    case MISSIONS_LOADING:
      return Object.assign({}, state, { isLoading: true });
    default:
      return state;
  }
};