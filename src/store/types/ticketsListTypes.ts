import { AviasalesTicketInterface } from "./ticketTypes";

export type statusType = "success" | "failed" | "loading";

export const CHANGE_STATUS = `ticketsList/CHANGE_STATUS`;
export const CHANGE_IS_ALL = `ticketsList/CHANGE_IS_ALL`;
export const SET_SEARCH_ID = `ticketsList/SET_SEARCH_ID`;
export const ADD_TICKETS = `ticketsList/ADD_TICKETS`;

export type TicketsListActionChangeStatus = {
  type: typeof CHANGE_STATUS;
  payload: statusType;
};
export type TicketsListActionChangeIsAll = {
  type: typeof CHANGE_IS_ALL;
  payload: boolean;
};
export type TicketsListActionSetSearchId = {
  type: typeof SET_SEARCH_ID;
  payload: string;
};
export type TicketsListActionAddTickets = {
  type: typeof ADD_TICKETS;
  payload: AviasalesTicketInterface[];
};

export type TicketsListAction =
  | TicketsListActionChangeStatus
  | TicketsListActionChangeIsAll
  | TicketsListActionSetSearchId
  | TicketsListActionAddTickets;
