import {
  TransferSortActionCheapest,
  TransferSortActionFastest,
  CHEAPEST,
  FASTEST,
} from "../types/transferSortTypes";

export const cheapest = (): TransferSortActionCheapest => ({ type: CHEAPEST });
export const fastest = (): TransferSortActionFastest => ({ type: FASTEST });
