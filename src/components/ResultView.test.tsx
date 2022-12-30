import { render, screen, waitFor } from "@testing-library/react";

import Pagination from "./Pagination";

test("check pagination bar for single page result", async() => {
  const mockDataLength: number = 13;

  render(<Pagination resCount={mockDataLength} searchWords="something" setRespond={null} showLoader={false} />);

  await waitFor(() => screen.getAllByTestId("pagination_bar"));

  expect(screen.getByTestId("pagination_bar")).toBeInTheDocument();
  expect(screen.getByTestId("pagination_bar")).toHaveTextContent('1');
});

test("check pagination bar for less than 1000 items result", async() => {
  const mockDataLength: number = 533;

  render(<Pagination resCount={mockDataLength} searchWords="something" setRespond={null} showLoader={false} />);

  await waitFor(() => screen.getAllByTestId("pagination_bar"));

  expect(screen.getByTestId("pagination_bar")).toBeInTheDocument();
  expect(screen.getByTestId("pagination_bar")).toHaveTextContent(`${Math.ceil(mockDataLength / Number(process.env.REACT_APP_PER_PAGE_COUNT))}`);
});

test("check pagination bar for more than 1000 items result", async() => {
  const mockDataLength: number = 74533;

  render(<Pagination resCount={mockDataLength} searchWords="something" setRespond={null} showLoader={false} />);

  await waitFor(() => screen.getAllByTestId("pagination_bar"));

  expect(screen.getByTestId("pagination_bar")).toBeInTheDocument();
  expect(screen.getByTestId("pagination_bar")).toHaveTextContent('50');
});