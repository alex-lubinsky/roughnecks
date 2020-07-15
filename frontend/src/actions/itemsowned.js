import axios from "axios";
import { tokenConfig } from './auth';
import { SET_ITEMS_OWNED, ADD_ITEMS_OWNED, ITEMS_OWNED_LOADING } from './actionvariables';

const setItemsOwned = (itemsOwned) => ({
  type: SET_ITEMS_OWNED,
  itemsOwned
});

const itemsOwnedLoading = () => ({
  type: ITEMS_OWNED_LOADING
});


export function startSetItemsOwned() {
  return (dispatch, getState) => {
    dispatch(itemsOwnedLoading());
    return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/itemsowned/`, tokenConfig(getState().auth.token))
    .then(res => {
      dispatch(setItemsOwned(res.data));
      return(res.data);
    });
  };
};

const addItemsOwned = (itemsOwned) => ({
  type: ADD_ITEMS_OWNED,
  itemsOwned
});

export const startAddItemsOwned = (itemsOwnedData = {}) => {
  return (dispatch, getState) => {
    const {
        item = 0,
        character = 0,
    } = itemsOwnedData;

    const itemOwned = {item, character};

    return axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/itemsowned/`, itemOwned, tokenConfig(getState().auth.token))
    .then(res => {
      dispatch(addItemsOwned(res.data));
      return(res.data);
    }).catch(err => {
      console.log(err);
    });
  };
};