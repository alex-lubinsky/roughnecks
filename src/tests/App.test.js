import App from "../App";
import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

describe("App Component", () => {
  test("renders correctly", () => {
    const wrapper = shallow(<App />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
