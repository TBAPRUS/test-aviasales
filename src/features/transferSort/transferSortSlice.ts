import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store";


export interface TransferSortState {
  cheapest: boolean;
  fastest: boolean;
}

const initialState: TransferSortState = {
  cheapest: true,
  fastest: false
}

export const transferSortSlice = createSlice({
  name: 'transferSort',
  initialState,
  reducers : {
    cheapest: (state) => {
      state.cheapest = true;
      state.fastest = false;
    },
    fastest: (state) => {
      state.fastest = true;
      state.cheapest = false;
    }
  }
});

export const { cheapest, fastest } = transferSortSlice.actions;

export const selectTransferSort = (state: RootState) => state.transferSort;

export default transferSortSlice.reducer;