import axios from "axios";

import {
  USER_LOADED,
  AUTH_ERROR,
  USERS_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESSFUL,
  AUTHENTICATION_ERROR,
  USER_LOADING,
  USERS_LOADING,
} from "../variables/actionvariables";

const loadUser = (user) => ({
  type: USER_LOADED,
  payload: user,
});

const authError = () => ({
  type: AUTH_ERROR,
});

const userLoading = () => ({
  type: USER_LOADING,
});

// LOAD USER
export const startLoadUser = () => {
  return (dispatch, getState) => {
    dispatch(userLoading());
    axios
      .get(`/api/auth/user/`, tokenConfig(getState().auth.token))
      .then((res) => {
        dispatch(loadUser(res.data));
        return res.data;
      })
      .catch((err) => {
        dispatch(authError());
      });
  };
};

const loadUsers = (users) => ({
  type: USERS_LOADED,
  users,
});

const usersLoading = () => ({
  type: USERS_LOADING,
});

export const startLoadUsers = () => {
  return (dispatch, getState) => {
    dispatch(usersLoading());

    axios
      .get(`/api/auth/users/`, tokenConfig(getState().auth.token))
      .then((res) => {
        dispatch(loadUsers(res.data));
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const login = (token) => ({
  type: LOGIN_SUCCESS,
  payload: token,
});

const loginFail = () => ({
  type: LOGIN_FAIL,
});

// LOGIN USER
export const startLogin = (loginData = {}) => {
  return (dispatch, getState) => {
    return axios
      .post(`/api/dj-rest-auth/login/`, loginData)
      .then((res) => {
        const payload = {
          token: res.data.key,
        };
        dispatch(login(payload));
      })
      .catch((err) => {
        console.log(err.response);
        dispatch(loginFail());
        return err
      });
  };
};

const logoutSuccessful = () => ({
  type: LOGOUT_SUCCESSFUL,
});

const authenticationError = (error) => ({
  type: AUTHENTICATION_ERROR,
  data: error,
});

export const logout = () => {
  return (dispatch) => {
    // let headers = {'Content-Type': 'application/json'}

    return axios
      .post(`/api/dj-rest-auth/logout/`, "")
      .then((res) => {
        dispatch(logoutSuccessful());
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        dispatch(authenticationError(err));
      });
  };
};

export const resetPassword = (email) => {
  
  return axios
    .post(`/api/dj-rest-auth/password/reset/`, { email: email })
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.log(err.response);
      return err
    });
};

export const resetPasswordConfirm = (resetData) => {
  return axios
    .post(`/api/dj-rest-auth/password/reset/confirm/`, {
      uid: resetData.uid,
      token: resetData.token,
      new_password1: resetData.new_password1,
      new_password2: resetData.new_password2,
    })
    .then((res) => {
      return res
    })
    .catch((err) => {
      return err
    });
};

// helper function
export const tokenConfig = (authKey) => {
  // Get token
  const token = authKey;

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};
