import axios from "axios";
import { tokenConfig } from "./auth";
import {
  ADD_CHARACTER,
  SET_CHARACTERS,
  EDIT_CHARACTER,
  REMOVE_CHARACTER,
  CHARACTERS_LOADING,
} from "../variables/actionvariables";

const loadingCharacters = () => ({
  type: CHARACTERS_LOADING,
});

const addCharacter = (character) => ({
  type: ADD_CHARACTER,
  character,
});

export const startAddCharacter = (characterData = {}) => {
  return (dispatch, getState) => {
    const {
      fullName = "",
      raceName = "",
      armorClass = 0,
      passivePerception = 0,
      maxHp = 0,
      creator = 0,
      altVision = "",
    } = characterData;

    const character = {
      fullName,
      raceName,
      armorClass,
      passivePerception,
      maxHp,
      creator,
      altVision,
    };

    return axios
      .post(`/api/characters/`, character, tokenConfig(getState().auth.token))
      .then((res) => {
        dispatch(addCharacter(res.data));
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const setCharacters = (characters) => ({
  type: SET_CHARACTERS,
  characters,
});

export function startSetCharacters() {
  return (dispatch, getState) => {
    dispatch(loadingCharacters());
    return axios
      .get(`/api/characters/`, tokenConfig(getState().auth.token))
      .then((res) => {
        dispatch(setCharacters(res.data));
      }).catch(err => {
        console.log(err.response);
        return err.response
      });
  };
}

export const removeCharacter = (id) => ({
  type: REMOVE_CHARACTER,
  id,
});

export function startRemoveCharacter({ id } = {}) {
  return (dispatch, getState) => {
    return axios
      .delete(`/api/characters/${id}/`, tokenConfig(getState().auth.token))
      .then((res) => {
        dispatch(removeCharacter(id));
      });
  };
}

const editCharacter = (id, updates) => ({
  type: EDIT_CHARACTER,
  id,
  updates,
});

export const startEditCharacter = (id, updates) => {
  return (dispatch, getState) => {
    return axios
      .put(
        `/api/characters/${id}/`,
        tokenConfig(getState().auth.token),
        updates
      )
      .then((res) => {
        dispatch(editCharacter(id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const startUpdateCharacter = (id, updates) => {
  return (dispatch, getState) => {
    return axios
      .patch(
        `/api/characters/${id}/`,
        updates,
        tokenConfig(getState().auth.token)
      )
      .then((res) => {
        dispatch(editCharacter(id, updates));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
