import axios from "axios";
import { tokenConfig } from './auth';
import { SET_ITEMS, EDIT_ITEM, ITEMS_LOADING } from './actionvariables';

const setItmes = (items) => ({
  type: SET_ITEMS,
  items
});

const itemsLoading = () => ({
  type: ITEMS_LOADING
});

export function startSetItems() {
  return (dispatch, getState) => {
    dispatch(itemsLoading());
    return axios.get(`/api/items/`, tokenConfig(getState().auth.token))
    .then(res => {
      dispatch(setItmes(res.data));
      return(res.data);
    });
  };
};

const editItem = (id, updates) => ({
  type: EDIT_ITEM,
  id,
  updates
});

export const startUpdateItem = (id, updates) => {
  return (dispatch, getState) => {
    return axios.patch(`/api/items/${id}/`, updates, tokenConfig(getState().auth.token))
    .then(res => {
      dispatch(editItem(id, updates));
    }).catch((err)=>{
      console.log(err);
    });
  };
};
