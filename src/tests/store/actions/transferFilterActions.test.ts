import {
  changeTransfers,
  changeAllTransfers,
} from "../../../store/actions/transferFilterActions";
import { TransferFilterState } from "../../../store/reducers/transferFilterReducer";
import {
  CHANGE_TRANSFERS,
  CHANGE_ALL_TRANSFERS,
} from "../../../store/types/transferFilterTypes";

describe("Test Transfer filter actions", () => {
  const transfers: (keyof TransferFilterState)[] = [
    "noTransfers",
    "oneTransfers",
    "twoTransfers",
    "threeTransfers",
  ];
  transfers.forEach((transfer) =>
    it(`should create an action to change transfers (${transfer})`, () => {
      const expectedAction = {
        type: CHANGE_TRANSFERS,
        payload: transfer,
      };
      expect(changeTransfers(transfer)).toEqual(expectedAction);
    })
  );

  it("should create an action to change all transfers with TRUE", () => {
    const expectedAction = {
      type: CHANGE_ALL_TRANSFERS,
      payload: true,
    };
    expect(changeAllTransfers(true)).toEqual(expectedAction);
  });

  it("should create an action to change all transfers with FALSE", () => {
    const expectedAction = {
      type: CHANGE_ALL_TRANSFERS,
      payload: false,
    };
    expect(changeAllTransfers(false)).toEqual(expectedAction);
  });
});
