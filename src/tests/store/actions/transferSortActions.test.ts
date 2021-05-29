import { cheapest, fastest } from "../../../store/actions/transferSortActions";
import { CHEAPEST, FASTEST } from "../../../store/types/transferSortTypes";

describe("Test Transfer sort actions", () => {
  it("should create an action to sort by the cheapest", () => {
    const expectedAction = {
      type: CHEAPEST,
    };
    expect(cheapest()).toEqual(expectedAction);
  });

  it("should create an action to sort by the fastest", () => {
    const expectedAction = {
      type: FASTEST,
    };
    expect(fastest()).toEqual(expectedAction);
  });
});
