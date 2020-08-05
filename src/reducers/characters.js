import {
  ADD_CHARACTER,
  SET_CHARACTERS,
  EDIT_CHARACTER,
  REMOVE_CHARACTER,
  CHARACTERS_LOADING,
} from "../variables/actionvariables";

const characterReducerDefaultState = { data: [], isLoading: false };

export default (state = characterReducerDefaultState, action) => {
  switch (action.type) {
    case ADD_CHARACTER:
      return Object.assign({}, state, {
        data: [...state.data, action.character],
      });
    case CHARACTERS_LOADING:
      return Object.assign({}, state, { isLoading: true });
    case SET_CHARACTERS:
      return Object.assign({}, state, {
        isLoading: false,
        data: action.characters,
      });
    case REMOVE_CHARACTER:
      return Object.assign({}, state, {
        data: state.data.filter(({ id }) => action.id !== id),
      });
    case EDIT_CHARACTER:
      return Object.assign({}, state, {
        data: state.data.map((character) => {
          if (character.id === action.id) {
            return {
              ...character,
              ...action.updates,
            };
          } else {
            return character;
          }
        }),
      });
    default:
      return state;
  }
};
