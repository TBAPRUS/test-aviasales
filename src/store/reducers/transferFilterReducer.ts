import { RootState } from "../store";
import {
  CHANGE_ALL_TRANSFERS,
  CHANGE_TRANSFERS,
  TransferFilterAction,
} from "../types/transferFilterTypes";

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

export const initialState: TransferFilterState = {
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

export type TransferFilterElement = keyof TransferFilterState;

export const selectTransferFilter = (state: RootState) => state.transferFilter;

const reducer = (
  state: TransferFilterState = initialState,
  action: TransferFilterAction
): TransferFilterState => {
  switch (action.type) {
    case CHANGE_TRANSFERS:
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          checked: !state[action.payload].checked,
        },
      };
    case CHANGE_ALL_TRANSFERS:
      const temp = { ...state };
      for (const key in initialState) {
        temp[key as TransferFilterElement].checked = action.payload;
      }
      return temp;
    default:
      return state;
  }
};

export default reducer;
