import {
  SET_AIRSHIP_UPGRADE,
  ADD_AIRSHIP_UPGRADE,
  AIRSHIP_UPGRADES_LOADING,
} from "../variables/actionvariables";

const airshpiUpgradesReducerDefaultState = { data: [], isLoading: false };

export default (state = airshpiUpgradesReducerDefaultState, action) => {
  switch (action.type) {
    case ADD_AIRSHIP_UPGRADE:
      return Object.assign({}, state, {
        data: [...state.data, action.airshipUpgrade],
      });
    case SET_AIRSHIP_UPGRADE:
      return Object.assign({}, state, {
        isLoading: false,
        data: action.airshipUpgrades,
      });
    case AIRSHIP_UPGRADES_LOADING:
      return Object.assign({}, state, { isLoading: true });
    default:
      return state;
  }
};
