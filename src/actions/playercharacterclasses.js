import axios from "axios";
import { tokenConfig } from "./auth";
import {
  SET_PCSUBCLASSES,
  ADD_PCSUBCLASS,
  PCSUBCLASSES_LOADING,
} from "../variables/actionvariables";

const setPCSubclasses = (pcSubclass) => ({
  type: SET_PCSUBCLASSES,
  pcSubclass,
});

const pcSubclassesLoading = () => ({
  type: PCSUBCLASSES_LOADING,
});

export function startSetPCSubclasses() {
  return (dispatch, getState) => {
    dispatch(pcSubclassesLoading());
    return axios
      .get(`/api/playercharacterclasses/`, tokenConfig(getState().auth.token))
      .then((res) => {
        dispatch(setPCSubclasses(res.data));
        return res.data;
      });
  };
}

const addPcSubclass = (pcSubclass) => ({
  type: ADD_PCSUBCLASS,
  pcSubclass,
});

export const startAddPcSubclass = (pcSubclassData = {}) => {
  return (dispatch, getState) => {
    const {
      classCharacter = 0,
      playerClass = 0,
      levelNumber = 1,
      dateCreated = 0,
    } = pcSubclassData;

    const pcSubclass = {
      classCharacter,
      playerClass,
      dateCreated,
      levelNumber,
    };

    return axios
      .post(
        `/api/playercharacterclasses/`,
        pcSubclass,
        tokenConfig(getState().auth.token)
      )
      .then((res) => {
        dispatch(addPcSubclass(res.data));
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
