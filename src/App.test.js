import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders header", async () => {
  const { getByText } = render(<App />);

  const header = await getByText(/Restaurants/);
  expect(header).toBeInTheDocument();
});
