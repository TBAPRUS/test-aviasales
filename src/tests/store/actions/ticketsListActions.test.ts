import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  ADD_TICKETS,
  CHANGE_IS_ALL,
  CHANGE_STATUS,
  SET_SEARCH_ID,
  statusType,
} from "../../../store/types/ticketsListTypes";
import {
  AviasalesTicketInterface,
  TicketInterface,
} from "../../../store/types/ticketTypes";
import {
  addTickets,
  changeIsAll,
  changeStatus,
  setSearchId,
  fetchSearchId,
  fetchTickets,
} from "../../../store/actions/ticketsListActions";
import mockTickets from "../../data/tickets.json";
import axios from "axios";
import { IndexElements } from "../../../store/types/indexedTypes";

jest.mock("axios", () => {
  return {
    get: jest.fn(),
  };
});

const mockStore = configureMockStore([thunk]);

describe("Test Tickets list async actions", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should create actions (fetchSearchId) to change status and set searchId", () => {
    const searchId = "asdasd";

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
      data: { searchId: searchId },
    });

    const expectedActions = [
      { type: CHANGE_STATUS, payload: "loading" },
      { type: SET_SEARCH_ID, payload: searchId },
      { type: CHANGE_STATUS, payload: "success" },
    ];

    const store: any = mockStore({ searchId: "" });

    return store.dispatch(fetchSearchId()).then(() => {
      expect(axios.get).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("should create actions (fetchSearchId) to change status with fail", () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce(
      new Error()
    );

    const expectedActions = [
      { type: CHANGE_STATUS, payload: "loading" },
      { type: CHANGE_STATUS, payload: "failed" },
    ];

    const store: any = mockStore({ ticketsList: { searchId: "" } });

    return store.dispatch(fetchSearchId()).then(() => {
      expect(axios.get).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("should create actions (fetchTickets) to change status, add tickets and set isAll=true", () => {
    const tickets: AviasalesTicketInterface[] =
      mockTickets as AviasalesTicketInterface[];

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
      data: { tickets, stop: true },
    });

    const expectedActions = [
      { type: CHANGE_STATUS, payload: "loading" },
      { type: ADD_TICKETS, payload: tickets },
      { type: CHANGE_IS_ALL, payload: true },
      { type: CHANGE_STATUS, payload: "success" },
    ];

    const store: any = mockStore({
      ticketsList: { tickets: [], isAll: false },
    });

    return store.dispatch(fetchTickets("asd")).then(() => {
      expect(axios.get).toBeCalled();
      const actions = store.getActions();
      expect(actions[0]).toEqual(expectedActions[0]);
      actions[1].payload = actions[1].payload.map(
        (ticket: Partial<TicketInterface>) => {
          delete ticket.id;
          return ticket;
        }
      );
      expect(actions[1]).toEqual(expectedActions[1]);
      expect(actions[2]).toEqual(expectedActions[2]);
      expect(actions[3]).toEqual(expectedActions[3]);
    });
  });

  it("should create actions (fetchTickets) to change status, add tickets and set isAll=false", () => {
    const tickets: AviasalesTicketInterface[] =
      mockTickets as AviasalesTicketInterface[];

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
      data: { tickets, stop: false },
    });

    const expectedActions = [
      { type: CHANGE_STATUS, payload: "loading" },
      { type: ADD_TICKETS, payload: tickets },
      { type: CHANGE_IS_ALL, payload: false },
      { type: CHANGE_STATUS, payload: "success" },
    ];

    const store: any = mockStore({
      ticketsList: { tickets: [], isAll: true },
    });

    return store.dispatch(fetchTickets("asd")).then(() => {
      expect(axios.get).toBeCalled();
      const actions = store.getActions();
      expect(actions[0]).toEqual(expectedActions[0]);
      actions[1].payload = actions[1].payload.map(
        (ticket: Partial<TicketInterface>) => {
          delete ticket.id;
          return ticket;
        }
      );
      expect(actions[1]).toEqual(expectedActions[1]);
      expect(actions[2]).toEqual(expectedActions[2]);
      expect(actions[3]).toEqual(expectedActions[3]);
    });
  });

  it("should create actions (fetchTickets) to change status, add tickets and not set isAll", () => {
    const tickets: AviasalesTicketInterface[] =
      mockTickets as AviasalesTicketInterface[];

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
      data: { tickets, stop: false },
    });

    const expectedActions = [
      { type: CHANGE_STATUS, payload: "loading" },
      { type: ADD_TICKETS, payload: tickets },
      { type: CHANGE_STATUS, payload: "success" },
    ];

    const store: any = mockStore({
      ticketsList: { tickets: [], isAll: false },
    });

    return store.dispatch(fetchTickets("asd")).then(() => {
      expect(axios.get).toBeCalled();
      const actions = store.getActions();
      expect(actions[0]).toEqual(expectedActions[0]);
      actions[1].payload = actions[1].payload.map(
        (ticket: Partial<TicketInterface>) => {
          delete ticket.id;
          return ticket;
        }
      );
      expect(actions[1]).toEqual(expectedActions[1]);
      expect(actions[2]).toEqual(expectedActions[2]);
    });
  });

  it("should create actions (fetchTickets) to change status, add tickets and not set isAll", () => {
    const tickets: TicketInterface[] = mockTickets as TicketInterface[];
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
      data: { tickets, stop: true },
    });

    const expectedActions = [
      { type: CHANGE_STATUS, payload: "loading" },
      { type: ADD_TICKETS, payload: tickets },
      { type: CHANGE_STATUS, payload: "success" },
    ];

    const store: any = mockStore({
      ticketsList: { tickets: [], isAll: true },
    });

    return store.dispatch(fetchTickets("asd")).then(() => {
      expect(axios.get).toBeCalled();
      const actions = store.getActions();
      expect(actions[0]).toEqual(expectedActions[0]);
      actions[1].payload = actions[1].payload.map(
        (ticket: Partial<TicketInterface>) => {
          delete ticket.id;
          return ticket;
        }
      );
      expect(actions[1]).toEqual(expectedActions[1]);
      expect(actions[2]).toEqual(expectedActions[2]);
    });
  });

  it("should create actions (fetchTickets) to change status, add tickets with fail", () => {
    const tickets: AviasalesTicketInterface[] =
      mockTickets as AviasalesTicketInterface[];

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce(
      new Error()
    );

    const expectedActions = [
      { type: CHANGE_STATUS, payload: "loading" },
      { type: CHANGE_STATUS, payload: "failed" },
    ];

    const store: any = mockStore({
      ticketsList: { tickets: [], isAll: true },
    });

    return store.dispatch(fetchTickets("asd")).then(() => {
      expect(axios.get).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe("Test Tickets list sync actions", () => {
  it("should create an action to change isAll TRUE", () => {
    const expectedAction = {
      type: CHANGE_IS_ALL,
      payload: true,
    };
    expect(changeIsAll(true)).toEqual(expectedAction);
  });

  const statuses: statusType[] = ["success", "loading", "failed"];
  statuses.forEach((status) =>
    it(`should create an action to change status ${status}`, () => {
      const expectedAction = {
        type: CHANGE_STATUS,
        payload: status,
      };
      expect(changeStatus(status)).toEqual(expectedAction);
    })
  );

  it("should create an action to change isAll TRUE", () => {
    const expectedAction = {
      type: CHANGE_IS_ALL,
      payload: true,
    };
    expect(changeIsAll(true)).toEqual(expectedAction);
  });

  it("should create an action to change isAll FALSE", () => {
    const expectedAction = {
      type: CHANGE_IS_ALL,
      payload: false,
    };
    expect(changeIsAll(false)).toEqual(expectedAction);
  });

  it("should create an action to set searchId", () => {
    const searchId = "12432";
    const expectedAction = {
      type: SET_SEARCH_ID,
      payload: searchId,
    };
    expect(setSearchId(searchId)).toEqual(expectedAction);
  });

  it("should create an action to add tickets without data", () => {
    const tickets: TicketInterface[] = [];
    const expectedAction = {
      type: ADD_TICKETS,
      payload: tickets,
    };
    expect(addTickets(tickets)).toEqual(expectedAction);
  });

  it("should create an action to add tickets", () => {
    const indexElements = new IndexElements();
    const tickets: TicketInterface[] = indexElements.index(mockTickets);
    let expectedAction = {
      type: ADD_TICKETS,
      payload: tickets,
    };
    expect(addTickets(tickets)).toEqual(expectedAction);
  });

  it("should create an thunk action to fetch search id", () => {
    let id = 0;
    const tickets: TicketInterface[] = (
      mockTickets as AviasalesTicketInterface[]
    ).map((ticket) => ({ ...ticket, id: id++ }));
    const expectedAction = {
      type: ADD_TICKETS,
      payload: tickets,
    };
    expect(addTickets(tickets)).toEqual(expectedAction);
  });
});
