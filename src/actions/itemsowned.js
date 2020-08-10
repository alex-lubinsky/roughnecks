import axios from "axios";
import { tokenConfig } from "./auth";
import {
  SET_ITEMS_OWNED,
  ADD_ITEMS_OWNED,
  ITEMS_OWNED_LOADING,
  REMOVE_ITEM_OWNED,
  UPDATE_ITEM_OWNED
} from "../variables/actionvariables";

const setItemsOwned = (itemsOwned) => ({
  type: SET_ITEMS_OWNED,
  itemsOwned,
});

const itemsOwnedLoading = () => ({
  type: ITEMS_OWNED_LOADING,
});

export function startSetItemsOwned() {
  return (dispatch, getState) => {
    dispatch(itemsOwnedLoading());
    return axios
      .get(`/api/itemsowned/`, tokenConfig(getState().auth.token))
      .then((res) => {
        dispatch(setItemsOwned(res.data));
        return res.data;
      });
  };
}

const addItemsOwned = (itemsOwned) => ({
  type: ADD_ITEMS_OWNED,
  itemsOwned,
});

export const startAddItemsOwned = (itemsOwnedData = {}) => {
  return (dispatch, getState) => {
    const { item = 0, character = 0, qty = 0 } = itemsOwnedData;

    const itemOwned = { item, character, qty };

    return axios
      .post(`/api/itemsowned/`, itemOwned, tokenConfig(getState().auth.token))
      .then((res) => {
        dispatch(addItemsOwned(res.data));
        return res.data;
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};

const updateItemOwned = (id, updates) => ({
  type: UPDATE_ITEM_OWNED,
  id,
  updates,
});

export const startUpdateItemOwned = (id, updates) => {
  return (dispatch, getState) => {
    return axios
      .patch(
        `/api/itemsowned/${id}/`,
        updates,
        tokenConfig(getState().auth.token)
      )
      .then((res) => {
        dispatch(updateItemOwned(id, updates));
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};

const removeItemOwned = (id) => ({
  type: REMOVE_ITEM_OWNED,
  id,
});

export const startRemoveItemOwned = (id) => {
  return (dispatch, getState) => {
    return axios
      .delete(`/api/itemsowned/${id}/`, tokenConfig(getState().auth.token))
      .then((res) => {
        dispatch(removeItemOwned(id));
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};
