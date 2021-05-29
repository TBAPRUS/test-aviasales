import {
  addTickets,
  changeIsAll,
  changeStatus,
  setSearchId,
} from "../../../store/actions/ticketsListActions";
import reducer, {
  initialState,
} from "../../../store/reducers/ticketsListReducer";
import { IndexElements } from "../../../store/types/indexedTypes";
import { TicketsListActionAddTickets } from "../../../store/types/ticketsListTypes";
import { TicketInterface } from "../../../store/types/ticketTypes";
import mockTickets from "../../data/tickets.json";

describe("Tickets list reducer tests", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {} as TicketsListActionAddTickets)).toEqual(
      initialState
    );
  });

  it("should return the current state", () => {
    expect(reducer(initialState, {} as TicketsListActionAddTickets)).toEqual(
      initialState
    );

    expect(
      reducer(
        { ...initialState, isAll: true },
        {} as TicketsListActionAddTickets
      )
    ).toEqual({ ...initialState, isAll: true });
  });

  it("should handle CHANGE_STATUS", () => {
    expect(reducer(undefined, changeStatus("failed"))).toEqual({
      ...initialState,
      status: "failed",
    });

    expect(reducer(undefined, changeStatus("loading"))).toEqual({
      ...initialState,
      status: "loading",
    });

    expect(reducer(undefined, changeStatus("success"))).toEqual({
      ...initialState,
      status: "success",
    });
  });

  it("should handle CHANGE_IS_ALL", () => {
    expect(reducer(undefined, changeIsAll(true))).toEqual({
      ...initialState,
      isAll: true,
    });

    expect(reducer(undefined, changeIsAll(false))).toEqual({
      ...initialState,
      isAll: false,
    });
  });

  it("should handle SET_SEARCH_ID", () => {
    expect(reducer(undefined, setSearchId("asds"))).toEqual({
      ...initialState,
      searchId: "asds",
    });

    expect(reducer(undefined, setSearchId(""))).toEqual({
      ...initialState,
      searchId: "",
    });
  });

  it("should handle ADD_TICKETS", () => {
    const indexElements = new IndexElements();
    const indexed = indexElements.index<TicketInterface>(mockTickets);
    const state = reducer(undefined, addTickets(indexed));
    expect(state).toEqual({
      ...initialState,
      tickets: indexed,
    });
    expect(reducer(state, addTickets(indexed))).toEqual({
      ...initialState,
      tickets: [...indexed, ...indexed],
    });
  });
});
