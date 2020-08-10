import {
  SET_ITEMS_OWNED,
  ADD_ITEMS_OWNED,
  ITEMS_OWNED_LOADING,
  REMOVE_ITEM_OWNED,
  UPDATE_ITEM_OWNED,
} from "../variables/actionvariables";

const itemsOwnedReducerDefaultState = { data: [], isLoading: false };

export default (state = itemsOwnedReducerDefaultState, action) => {
  switch (action.type) {
    case ADD_ITEMS_OWNED:
      return Object.assign({}, state, {
        data: [...state.data, action.itemsOwned],
      });
    case SET_ITEMS_OWNED:
      return Object.assign({}, state, {
        isLoading: false,
        data: action.itemsOwned,
      });
    case UPDATE_ITEM_OWNED:
      return Object.assign({}, state, {
        data: state.data.map((itemOwned) => {
          if (itemOwned.id === action.id) {
            return {
              ...itemOwned,
              ...action.updates,
            };
          } else {
            return itemOwned;
          }
        }),
      });
    case REMOVE_ITEM_OWNED:
      return Object.assign({}, state, {
        data: state.data.filter(({ id }) => action.id !== id),
      });
    case ITEMS_OWNED_LOADING:
      return Object.assign({}, state, { isLoading: true });
    default:
      return state;
  }
};
