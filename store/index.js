import { combineReducers } from 'redux';
import { persistReducer } from "redux-persist";
import defaultStore from './default.store';
import localforage from 'localforage'

const persistConfig = {
    key: 'root',
    storage: localforage,
};

const rootReducer = combineReducers({
    defaultStore
});

export default defaultStore;