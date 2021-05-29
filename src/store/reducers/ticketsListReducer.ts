import { RootState } from "../../store/store";
import { TicketInterface } from "../../store/types/ticketTypes";
import {
  ADD_TICKETS,
  CHANGE_IS_ALL,
  CHANGE_STATUS,
  SET_SEARCH_ID,
  statusType,
  TicketsListAction,
} from "../types/ticketsListTypes";

export interface TicketsListState {
  tickets: TicketInterface[];
  isAll: boolean;
  searchId: string;
  status: statusType;
}

export const initialState: TicketsListState = {
  tickets: [],
  isAll: false,
  searchId: "",
  status: "loading",
};

export const selectTicketsList = (state: RootState) => state.ticketsList;

const reducer = (
  state: TicketsListState = initialState,
  action: TicketsListAction
): TicketsListState => {
  switch (action.type) {
    case CHANGE_STATUS:
      return { ...state, status: action.payload };
    case CHANGE_IS_ALL:
      return { ...state, isAll: action.payload };
    case SET_SEARCH_ID:
      return { ...state, searchId: action.payload };
    case ADD_TICKETS:
      return {
        ...state,
        tickets: [...state.tickets, ...action.payload],
      };
    default:
      return state;
  }
};

export default reducer;
