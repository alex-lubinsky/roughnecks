import { getLevel } from "../../functions/levels";

describe("get level function", () => {
  test("getLevel should return the correct level", () => {
    const input = 14;
    const output = 5;

    expect(getLevel(input)).toEqual(output);
  });

  test("getLevel should return 20 when input is greater than 108", () => {
    const input = 109;
    const output = 20;

    expect(getLevel(input)).toEqual(output);
  });
});
