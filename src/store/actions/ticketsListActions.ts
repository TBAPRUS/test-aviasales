import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import * as api from "../../api/ticketsListAPI";
import { selectTicketsList } from "../reducers/ticketsListReducer";
import { RootState } from "../store";
import { IndexElements } from "../types/indexedTypes";
import {
  ADD_TICKETS,
  CHANGE_IS_ALL,
  CHANGE_STATUS,
  SET_SEARCH_ID,
  statusType,
  TicketsListActionAddTickets,
  TicketsListActionChangeIsAll,
  TicketsListActionChangeStatus,
  TicketsListActionSetSearchId,
} from "../types/ticketsListTypes";
import { TicketInterface } from "../types/ticketTypes";

export const changeStatus = (
  status: statusType
): TicketsListActionChangeStatus => ({ type: CHANGE_STATUS, payload: status });
export const changeIsAll = (isAll: boolean): TicketsListActionChangeIsAll => ({
  type: CHANGE_IS_ALL,
  payload: isAll,
});
export const setSearchId = (
  searchId: string
): TicketsListActionSetSearchId => ({ type: SET_SEARCH_ID, payload: searchId });
export const addTickets = (
  tickets: TicketInterface[]
): TicketsListActionAddTickets => ({ type: ADD_TICKETS, payload: tickets });

export const fetchSearchId =
  (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    dispatch(changeStatus("loading"));
    try {
      dispatch(setSearchId(await api.fetchSearchId()));
      dispatch(changeStatus("success"));
    } catch (error) {
      dispatch(changeStatus("failed"));
    }
  };

const indexElements = new IndexElements();

export const fetchTickets =
  (searchId: string): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch, getState) => {
    dispatch(changeStatus("loading"));
    try {
      const response = await api.fetchTickets(searchId);
      dispatch(addTickets(indexElements.index(response.tickets)));
      const isAll = selectTicketsList(getState()).isAll;
      if (isAll !== response.stop) {
        dispatch(changeIsAll(response.stop));
      }
      dispatch(changeStatus("success"));
    } catch (error) {
      dispatch(changeStatus("failed"));
    }
  };
