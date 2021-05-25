import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { TicketInterface } from "../Ticket/TicketSlice";
import * as api from "./ticketsListAPI";

export interface TicketsListState {
  tickets: TicketInterface[];
  isAll: boolean;
  searchId: string;
  status: "success" | "failed" | "loading";
}

const initialState: TicketsListState = {
  tickets: [],
  isAll: false,
  searchId: "",
  status: "loading",
};

export const fetchSearchId = createAsyncThunk(
  "ticketsList/fetchSearchId",
  async () => {
    return await api.fetchSearchId();
  }
);

export const fetchTickets = createAsyncThunk(
  "ticketsList/fetchTickets",
  async (searchId: string) => {
    return await api.fetchTickets(searchId);
  }
);

let id = 0;
const maxTicketsCount = 500;

const ticketsListSlice = createSlice({
  name: "ticketsList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSearchId.fulfilled, (state, action) => {
        state.searchId = action.payload;
        state.status = "success";
      })
      .addCase(fetchSearchId.rejected, (state, action) => {
        state.status = "failed";
      });

    builder
      .addCase(fetchTickets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.isAll = action.payload.stop;
        state.status = "success";
        for (const ticket of action.payload.tickets) {
          if (state.tickets.length >= maxTicketsCount) {
            state.isAll = true;
            break;
          }
          state.tickets.push({ ...ticket, id: id++ });
        }
        // state.tickets.push(
        //   ...action.payload.tickets.map((ticket) => ({ ...ticket, id: id++ }))
        // );
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const selectTicketsList = (state: RootState) => state.ticketsList;

export default ticketsListSlice.reducer;
