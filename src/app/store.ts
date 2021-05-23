import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import transferFilterReducer from "../features/transferFilter/transferFilterSlice";
import transferSortReducer from "../features/transferSort/transferSortSlice";
import ticketsListReducer from "../features/ticketsList/ticketsListSlice";

export const store = configureStore({
  reducer: {
    transferFilter: transferFilterReducer,
    transferSort: transferSortReducer,
    ticketsList: ticketsListReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
