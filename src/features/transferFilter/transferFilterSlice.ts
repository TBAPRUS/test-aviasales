import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type TransferFilterItem = {
  name: keyof TransferFilterState;
  title: string;
  checked: boolean;
};

export interface TransferFilterState {
  noTransfers: TransferFilterItem;
  oneTransfers: TransferFilterItem;
  twoTransfers: TransferFilterItem;
  threeTransfers: TransferFilterItem;
}

const initialState: TransferFilterState = {
  noTransfers: {
    title: "Без пересадок",
    name: "noTransfers",
    checked: true,
  },
  oneTransfers: {
    title: "1 пересадка",
    name: "oneTransfers",
    checked: true,
  },
  twoTransfers: {
    title: "2 пересадки",
    name: "twoTransfers",
    checked: true,
  },
  threeTransfers: {
    title: "3 пересадки",
    name: "threeTransfers",
    checked: true,
  },
};

type TransferFilterElement = keyof TransferFilterState;

export const transferFilterSlice = createSlice({
  name: "transferFilter",
  initialState,
  reducers: {
    changeTransfers: (state, action: PayloadAction<TransferFilterElement>) => {
      state[action.payload].checked = !state[action.payload].checked;
    },
    changeAllTransfers: (state, action: PayloadAction<boolean>) => {
      for (const key in initialState) {
        state[key as TransferFilterElement].checked = action.payload;
      }
    },
  },
});

export const { changeTransfers, changeAllTransfers } = transferFilterSlice.actions;

export const selectTransferFilter = (state: RootState) => state.transferFilter;

export default transferFilterSlice.reducer;
