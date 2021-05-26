import { TransferFilterElement } from "../reducers/transferFilterReducer";
import {
  CHANGE_ALL_TRANSFERS,
  CHANGE_TRANSFERS,
  TransferSortActionChangeAllTransfers,
  TransferSortActionChangeTransfers,
} from "../types/transferFilterTypes";

export const changeTransfers = (
  field: TransferFilterElement
): TransferSortActionChangeTransfers => ({
  type: CHANGE_TRANSFERS,
  payload: field,
});

export const changeAllTransfers = (
  checked: boolean
): TransferSortActionChangeAllTransfers => ({
  type: CHANGE_ALL_TRANSFERS,
  payload: checked,
});
