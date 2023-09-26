import { createStore,combineReducers,applyMiddleware } from "redux";
import thunk from "redux-thunk";
import taskReducers from "./reducers";

const rootReducers = combineReducers({ taskReducers });

export const Store = createStore(rootReducers,applyMiddleware(thunk));