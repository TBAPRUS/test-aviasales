import { TransferFilterElement } from "../reducers/transferFilterReducer";

export const CHANGE_TRANSFERS = `transferFilter/CHANGE_TRANSFERS`;
export const CHANGE_ALL_TRANSFERS = `transferFilter/CHANGE_ALL_TRANSFERS`;

export type TransferSortActionChangeTransfers = {
  type: typeof CHANGE_TRANSFERS;
  payload: TransferFilterElement;
};
export type TransferSortActionChangeAllTransfers = {
  type: typeof CHANGE_ALL_TRANSFERS;
  payload: boolean;
};

export type TransferFilterAction =
  | TransferSortActionChangeTransfers
  | TransferSortActionChangeAllTransfers;
