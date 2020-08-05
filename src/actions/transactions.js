import axios from "axios";
import { tokenConfig } from "./auth";
import {
  SET_TRANSACTIONS,
  ADD_TRANSACTION,
  TRANSACTIONS_LOADING,
} from "../variables/actionvariables";

const setTransactions = (transactions) => ({
  type: SET_TRANSACTIONS,
  transactions,
});

const transactionsLoading = () => ({
  type: TRANSACTIONS_LOADING,
});

export function startSetTransactions() {
  return (dispatch, getState) => {
    dispatch(transactionsLoading());
    return axios
      .get(`/api/transactions/`, tokenConfig(getState().auth.token))
      .then((res) => {
        dispatch(setTransactions(res.data));
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export const addTransaction = (transaction) => ({
  type: ADD_TRANSACTION,
  transaction,
});

export const startAddTransaction = (transactionData = {}) => {
  return (dispatch, getState) => {
    const {
      name = "",
      goldPcs = 0,
      silverPcs = 0,
      copperPcs = 0,
      mission = 0,
      characters = [],
      airshipPot = true,
      earnedSpent = 1,
    } = transactionData;

    const transaction = {
      name,
      goldPcs,
      silverPcs,
      copperPcs,
      mission,
      characters,
      airshipPot,
      earnedSpent,
    };

    return axios
      .post(
        `/api/transactions/`,
        transaction,
        tokenConfig(getState().auth.token)
      )
      .then((res) => {
        dispatch(addTransaction(res.data));
        return res.data;
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};
