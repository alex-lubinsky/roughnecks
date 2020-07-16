import {  USER_LOADED, 
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESSFUL,
  AUTHENTICATION_ERROR,
  USER_LOADING,
} from '../actions/actionvariables';

const initialState = {
  isAuthenticated: null,
  user: null,
  token: localStorage.getItem('token'),
  isLoading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADED:
      return Object.assign({}, state, {user: action.payload, isAuthenticated: true, isLoading: false}) 
    case USER_LOADING:
      return Object.assign({}, state, {isLoading: true})
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        ...action.payload
      };
    case AUTH_ERROR:
      return {
        ...state,
        isLoading: false
      }
    case AUTHENTICATION_ERROR:
    case LOGIN_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null
      };
    case LOGOUT_SUCCESSFUL:
      localStorage.removeItem("token");
      return {
        ...state, 
        errors: action.data, 
        token: null, 
        user: null,
        isAuthenticated: false, 
      };
    default:
      return state;
  };
};