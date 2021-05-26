import { RootState } from "../store";
import {
  CHEAPEST,
  FASTEST,
  TransferSortAction,
} from "../types/transferSortTypes";

export interface TransferSortState {
  cheapest: boolean;
  fastest: boolean;
}

const initialState: TransferSortState = {
  cheapest: true,
  fastest: false,
};

export const selectTransferSort = (state: RootState) => state.transferSort;

const reducer = (
  state: TransferSortState = initialState,
  action: TransferSortAction
): TransferSortState => {
  switch (action.type) {
    case CHEAPEST:
      return { ...state, cheapest: true, fastest: false };
    case FASTEST:
      return { ...state, cheapest: false, fastest: true };
    default:
      return state;
  }
};

export default reducer;
