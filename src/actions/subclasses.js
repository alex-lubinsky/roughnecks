import axios from "axios";
import { tokenConfig } from './auth';
import { SET_SUBCLASSES, SUBCLASSES_LOADING } from './actionvariables';

const setSubclasses = (subclasses) => ({
  type: SET_SUBCLASSES,
  subclasses
});

const subclassesLoading = () => ({
  type: SUBCLASSES_LOADING
});

export function startSetSubclasses() {
  return (dispatch, getState) => {
    dispatch(subclassesLoading());
    return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/subclasses/`, tokenConfig(getState().auth.token))
    .then(res => {
      dispatch(setSubclasses(res.data));
      return(res.data);
    }).catch(err => {
      console.log(err);
    });
  };
};