import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import charactersReducer from "../reducers/characters";
import missionsReducer from "../reducers/missions";
import racesReducer from "../reducers/races";
import subclassesReducer from "../reducers/subclasses";
import pcSubclassesReducer from "../reducers/playercharacterclasses";
import transactionsReducer from "../reducers/transactions";
import downtimeReducer from "../reducers/downtime";
import itemReducer from "../reducers/items";
import authReducer from "../reducers/auth";
import downtimeTypeReducer from "../reducers/downtimetypes";
import downtimeJobsReducer from "../reducers/downtimejobs";
import itemsOwnedReducer from "../reducers/itemsowned";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import usersReducer from "../reducers/users";
import airshipUpgradeReducer from '../reducers/airshipupgrades' 

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  characters: charactersReducer,
  missions: missionsReducer,
  races: racesReducer,
  subclasses: subclassesReducer,
  pcSubclasses: pcSubclassesReducer,
  transactions: transactionsReducer,
  downtime: downtimeReducer,
  items: itemReducer,
  itemsOwned: itemsOwnedReducer,
  users: usersReducer,
  downtimeTypes: downtimeTypeReducer,
  downtimeJobs: downtimeJobsReducer,
  airshipUpgrades: airshipUpgradeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  const persistor = persistStore(store);
  return { store, persistor };
  // return store
};
