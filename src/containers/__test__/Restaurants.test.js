import * as React from "react";
import { render, fireEvent, act, cleanup, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import * as API from "../../api";
import { Restaurants } from "../Restaurants";

const mockData = {
  restaurants: [
    {
      id: 1,
      name: "Tanoshii Sushi",
      status: "open",
      sortingValues: {
        bestMatch: 0,
        newest: 96,
        ratingAverage: 4.5,
        distance: 1190,
        popularity: 17,
        averageProductPrice: 1536,
        deliveryCosts: 200,
        minCost: 1000
      }
    },
    {
      id: 2,
      name: "Tandoori Express",
      status: "closed",
      sortingValues: {
        bestMatch: 1,
        newest: 266,
        ratingAverage: 4.5,
        distance: 2308,
        popularity: 123,
        averageProductPrice: 1146,
        deliveryCosts: 150,
        minCost: 1300
      }
    }
  ]
};

beforeAll(() => {
  const consoleError = console.error;
  jest.spyOn(console, "error").mockImplementation((...args) => {
    if (
      !args[0].includes(
        "Warning: An update to %s inside a test was not wrapped in act"
      )
    ) {
      consoleError(...args);
    }
  });
  API.getRestaurant = jest.fn(() => Promise.resolve(mockData.restaurants));
});

describe("Restaurants tests", () => {
  afterEach(cleanup);

  test("Should display Loader first when restaurants data is not leaoded yet", async () => {
    const { getByTestId } = render(<Restaurants />);

    const Loader = getByTestId("loading");
    expect(Loader).toBeInTheDocument();
  });

  test("should display restaurants card list if restaurants data is leaoded ", async () => {
    const { getByTestId, getAllByTestId } = render(<Restaurants />);

    await wait();

    const restaurantsList = getByTestId("restaurants-list");
    const restaurantCards = getAllByTestId("restaurant-card");

    expect(restaurantsList).toBeInTheDocument();
    expect(restaurantCards).toHaveLength(2);
  });

  test("Should display restaurant name if restaurants list is leaoded", async () => {
    const { getByText } = render(<Restaurants />);

    await wait();

    const restaurantName = await getByText(/Tanoshii Sushi/);

    expect(restaurantName).toBeInTheDocument();
  });

  test("Favorite-button should toggle color from grey to red after click", async () => {
    const { getAllByTestId } = render(<Restaurants />);
    await wait();
    const favoriteButtons = await getAllByTestId("favorite-button");
    const fireFavoriteButton = favoriteButtons[0];

    expect(fireFavoriteButton).toBeInTheDocument();
    expect(fireFavoriteButton).toHaveClass("ui grey button");

    act(() => {
      fireEvent.click(fireFavoriteButton);
    });

    expect(fireFavoriteButton).toHaveClass("ui red button");

    act(() => {
      fireEvent.click(fireFavoriteButton);
    });

    expect(fireFavoriteButton).toHaveClass("ui grey button");
  });

  test("Should display error if getRestaurant is rejected", async () => {
    API.getRestaurant = jest.fn(() => Promise.reject("Error!"));

    const { getByText } = render(<Restaurants />);

    await wait();

    const error = getByText("Error!");
    expect(error).toBeInTheDocument();
  });
});
