import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { rest } from "msw";
import { setupServer } from "msw/node";

import App from "./App";

// test basic form bahaviours

test("search text and button initial bahaviour", () => {
  render(<App />);

  expect(screen.getByTestId("keywords_input")).toHaveValue("");
  expect(screen.getByTestId("submit_btn")).toBeDisabled();
});

test("search text and button input bahaviours", () => {
  render(<App />);

  const keywords_input = screen.getByTestId("keywords_input");
  const submit_btn = screen.getByTestId("submit_btn");

  // when user put one letter only
  userEvent.type(keywords_input, "a");

  expect(keywords_input).toHaveValue("a");
  expect(submit_btn).toBeDisabled();

  // when user put more letters
  userEvent.type(keywords_input, "bc");

  expect(keywords_input).toHaveValue("abc");
  expect(submit_btn).toBeEnabled();
});

/////////////////////
// mock API server //
/////////////////////

const mockData: Array<{}> = [];

for (let i = 1; i <= 100; i++) {
  mockData.push({
    name: `Repo ${i}`,
    description: `Repo description ${i}`,
    html_url: "#",
    owner: { url: "#" }
  });
}

const server = setupServer(
  rest.get(String(process.env.REACT_APP_API_URL), (req, res, ctx) => {
    return res(
      ctx.json({
        total_count: mockData.length,
        items: mockData
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// test api call result bahaviours

test("check result view and pagination after api call", async () => {
  render(<App />);

  userEvent.type(screen.getByTestId("keywords_input"), "Repo");
  userEvent.click(screen.getByTestId("submit_btn"));

  await waitFor(() => screen.getAllByTestId("result_item"));

  expect(screen.getByTestId("result_list")).toBeInTheDocument();
  expect(screen.getByTestId("result_list")).toHaveTextContent(`Repo ${mockData.length}`);

  expect(screen.getByTestId("pagination_bar")).toBeInTheDocument();
  expect(screen.getByTestId("pagination_bar")).toHaveTextContent(`${mockData.length / Number(process.env.REACT_APP_PER_PAGE_COUNT)}`);
});