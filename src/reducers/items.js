import { SET_ITEMS, EDIT_ITEM, ITEMS_LOADING } from '../actions/actionvariables';

const itemReducerDefaultState = {data: [], isLoading: false};

export default (state = itemReducerDefaultState, action) => {
  switch (action.type) {
    case SET_ITEMS:
      return Object.assign({}, state, {isLoading: false, data: action.items});
    case EDIT_ITEM:
      return Object.assign({}, state, {data: state.data.map((item) => {
        if (item.id === action.id) {
          return {
            ...item,
            ...action.updates
          };
        } else {
          return item;
        }
      })
    });
    case ITEMS_LOADING:
      return Object.assign({}, state, {isLoading: true});
    default:
      return state;
  };
};