import {
  changeAllTransfers,
  changeTransfers,
} from "../../../store/actions/transferFilterActions";
import reducer, {
  initialState,
  TransferFilterState,
} from "../../../store/reducers/transferFilterReducer";
import { TransferFilterAction } from "../../../store/types/transferFilterTypes";

describe("Transfer filter reducer tests", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {} as TransferFilterAction)).toEqual(
      initialState
    );
  });

  it("should return the current state", () => {
    expect(reducer(initialState, {} as TransferFilterAction)).toEqual(
      initialState
    );

    expect(
      reducer(
        {
          ...initialState,
          noTransfers: { name: "noTransfers", checked: true, title: "asd" },
        },
        {} as TransferFilterAction
      )
    ).toEqual({
      ...initialState,
      noTransfers: { name: "noTransfers", checked: true, title: "asd" },
    });
  });

  it("should handle CHANGE_TRANSFERS", () => {
    (
      Object.keys(initialState) as unknown as (keyof TransferFilterState)[]
    ).forEach((transfer) =>
      expect(reducer(undefined, changeTransfers(transfer))).toEqual({
        ...initialState,
        [transfer]: {
          ...initialState[transfer],
          checked: !initialState[transfer],
        },
      })
    );
  });

  it("should handle CHANGE_ALL_TRANSFERS", () => {
    expect(reducer(undefined, changeAllTransfers(true))).toEqual({
      ...initialState,
      noTransfers: {
        ...initialState.noTransfers,
        checked: true,
      },
      oneTransfers: {
        ...initialState.oneTransfers,
        checked: true,
      },
      twoTransfers: {
        ...initialState.twoTransfers,
        checked: true,
      },
      threeTransfers: {
        ...initialState.threeTransfers,
        checked: true,
      },
    });

    expect(reducer(undefined, changeAllTransfers(false))).toEqual({
      ...initialState,
      noTransfers: {
        ...initialState.noTransfers,
        checked: false,
      },
      oneTransfers: {
        ...initialState.oneTransfers,
        checked: false,
      },
      twoTransfers: {
        ...initialState.twoTransfers,
        checked: false,
      },
      threeTransfers: {
        ...initialState.threeTransfers,
        checked: false,
      },
    });
  });
});
