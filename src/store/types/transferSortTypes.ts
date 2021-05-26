export const CHEAPEST = `transferSort/CHEAPEST`;
export const FASTEST = `transferSort/FASTEST`;

export type TransferSortActionCheapest = { type: typeof CHEAPEST };
export type TransferSortActionFastest = { type: typeof FASTEST };

export type TransferSortAction =
  | TransferSortActionCheapest
  | TransferSortActionFastest;
