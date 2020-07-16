import { USERS_LOADED, USERS_LOADING } from '../actions/actionvariables';

const usersReducerDefaultState={isLoading: false, data: []};

export default (state = usersReducerDefaultState, action) => {
  switch (action.type) {
    case USERS_LOADED:
      return Object.assign({}, state, {isLoading: false, data: action.users});
    case USERS_LOADING:
      return Object.assign({}, state, {isLoading: true})
    default:
      return state;
  };
};