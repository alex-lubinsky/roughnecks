import axios from "axios";
import { tokenConfig } from "./auth";
import {
  SET_SUBCLASSES,
  SUBCLASSES_LOADING,
} from "../variables/actionvariables";

const setSubclasses = (subclasses) => ({
  type: SET_SUBCLASSES,
  subclasses,
});

const subclassesLoading = () => ({
  type: SUBCLASSES_LOADING,
});

export function startSetSubclasses() {
  return (dispatch, getState) => {
    dispatch(subclassesLoading());
    return axios
      .get(`/api/subclasses/`, tokenConfig(getState().auth.token))
      .then((res) => {
        dispatch(setSubclasses(res.data));
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
