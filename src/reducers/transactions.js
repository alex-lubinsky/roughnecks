import {
  SET_TRANSACTIONS,
  ADD_TRANSACTION,
  TRANSACTIONS_LOADING,
  UPDATE_TRANSACTION,
  REMOVE_TRANSACTION,
} from "../variables/actionvariables";

const transactionsReducerDefaultState = { data: [], isLoading: false };

export default (state = transactionsReducerDefaultState, action) => {
  switch (action.type) {
    case ADD_TRANSACTION:
      return Object.assign({}, state, {
        data: [...state.data, action.transaction],
      });
    case SET_TRANSACTIONS:
      return Object.assign({}, state, {
        isLoading: false,
        data: action.transactions,
      });
    case REMOVE_TRANSACTION:
      return Object.assign({}, state, {
        data: state.data.filter(({ id }) => action.id !== id),
      });
    case UPDATE_TRANSACTION:
      return Object.assign({}, state, {
        data: state.data.map((transaction) => {
          if (transaction.id === action.id) {
            return {
              ...transaction,
              ...action.updates,
            };
          } else {
            return transaction;
          }
        }),
      });
    case TRANSACTIONS_LOADING:
      return Object.assign({}, state, { isLoading: true });
    default:
      return state;
  }
};
