import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import transferFilterReducer from "./reducers/transferFilterReducer";
import transferSortReducer from "./reducers/transferSortReducer";
import ticketsListReducer from "./reducers/ticketsListReducer";

const reducer = combineReducers({
  transferFilter: transferFilterReducer,
  transferSort: transferSortReducer,
  ticketsList: ticketsListReducer,
});

export const store = createStore(reducer, applyMiddleware(thunk, logger));

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
