import { SET_ITEMS_OWNED, ADD_ITEMS_OWNED, ITEMS_OWNED_LOADING } from '../actions/actionvariables';

const itemsOwnedReducerDefaultState={data: [], isLoading: false};

export default (state = itemsOwnedReducerDefaultState, action) => {
  switch (action.type) {
    case ADD_ITEMS_OWNED:
      return Object.assign({}, state, {data: [...state.data, action.itemsOwned]});
    case SET_ITEMS_OWNED:
      return Object.assign({}, state, {isLoading: false, data: action.itemsOwned});
    case ITEMS_OWNED_LOADING:
      return Object.assign({}, state, {isLoading: true});
    default:
      return state;
  };
};