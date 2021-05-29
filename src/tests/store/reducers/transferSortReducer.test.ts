import { cheapest, fastest } from "../../../store/actions/transferSortActions";
import reducer, {
  initialState,
} from "../../../store/reducers/transferSortReducer";
import { TransferSortAction } from "../../../store/types/transferSortTypes";

describe("Transfer sort reducer tests", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {} as TransferSortAction)).toEqual(initialState);
  });

  it("should return the current state", () => {
    expect(reducer(initialState, {} as TransferSortAction)).toEqual(
      initialState
    );

    expect(
      reducer(
        {
          ...initialState,
          cheapest: true,
        },
        {} as TransferSortAction
      )
    ).toEqual({
      ...initialState,
      cheapest: true,
    });
  });

  it("should handle CHEAPEST", () => {
    expect(reducer(undefined, cheapest())).toEqual({
      ...initialState,
      cheapest: true,
      fastest: false,
    });
  });

  it("should handle FASTEST", () => {
    expect(reducer(undefined, fastest())).toEqual({
      ...initialState,
      cheapest: false,
      fastest: true,
    });
  });
});
