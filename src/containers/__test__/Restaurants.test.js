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
        minCost: 1000,
        topRestaurant: 20234.5
      },
      isFavorite: false
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
        minCost: 1300,
        topRestaurant: 283888.5
      },
      isFavorite: true
    },
    {
      id: 3,
      name: "Lale Restaurant & Snackbar",
      status: "order ahead",
      sortingValues: {
        bestMatch: 305,
        newest: 73,
        ratingAverage: 0,
        distance: 2880,
        popularity: 0,
        averageProductPrice: 838,
        deliveryCosts: 0,
        minCost: 0,
        topRestaurant: 0
      },
      isFavorite: false
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
    expect(restaurantCards).toHaveLength(3);
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
    const firstFavoriteButton = favoriteButtons[0];

    expect(firstFavoriteButton).toBeInTheDocument();
    expect(firstFavoriteButton).toHaveClass("ui red button");

    act(() => {
      fireEvent.click(firstFavoriteButton);
    });

    expect(firstFavoriteButton).toHaveClass("ui grey button");

    act(() => {
      fireEvent.click(firstFavoriteButton);
    });

    expect(firstFavoriteButton).toHaveClass("ui red button");
  });

  test("favorite restaurant should have priority in sorting then opening state​", async () => {
    const { getAllByTestId } = render(<Restaurants />);

    await wait();

    const restaurantCards = getAllByTestId("restaurant-card");
    // check mockData.restaurants to validate test result
    const fireFavoriteCard = restaurantCards[0];
    const secondFavoriteCard = restaurantCards[1];
    const therdFavoriteCard = restaurantCards[2];

    expect(fireFavoriteCard).toHaveTextContent(/Tandoori Express/);
    expect(secondFavoriteCard).toHaveTextContent(/Tanoshii Sushi/);
    expect(therdFavoriteCard).toHaveTextContent(/Lale Restaurant & Snackbar/);
  });

  test("Should sort restaurants depending on selected sortingValue", async () => {
    const { getAllByTestId, getByTestId, getByText } = render(<Restaurants />);

    await wait();

    const filterSortingValue = getByTestId("filter-sorting-value");

    expect(filterSortingValue).toBeInTheDocument();

    fireEvent.click(getByText("Newest"));

    const restaurantCards = getAllByTestId("restaurant-card");
    // check mockData.restaurants to validate test result
    const fireFavoriteCard = restaurantCards[0];
    const secondFavoriteCard = restaurantCards[1];
    const therdFavoriteCard = restaurantCards[2];

    expect(fireFavoriteCard).toHaveTextContent(/newest: 266/);
    expect(secondFavoriteCard).toHaveTextContent(/newest: 96/);
    expect(therdFavoriteCard).toHaveTextContent(/newest: 73/);
  });

  test("Sorting Values filter should have a new value topRestaurant", async () => {
    const { getAllByTestId, getByTestId, getByText } = render(<Restaurants />);

    await wait();

    const filterSortingValue = getByTestId("filter-sorting-value");

    expect(filterSortingValue).toBeInTheDocument();

    fireEvent.click(getByText(/Top Restaurant/));

    const restaurantCards = getAllByTestId("restaurant-card");
    // check mockData.restaurants to validate test result
    const fireFavoriteCard = restaurantCards[0];
    const secondFavoriteCard = restaurantCards[1];
    const therdFavoriteCard = restaurantCards[2];

    expect(fireFavoriteCard).toHaveTextContent(/topRestaurant: 283888.5/);
    expect(secondFavoriteCard).toHaveTextContent(/topRestaurant: 20234.5/);
    expect(therdFavoriteCard).toHaveTextContent(/topRestaurant: 0/);
  });

  test("Should filter restaurants depending on input searchValue", async () => {
    const { getAllByTestId, getByPlaceholderText } = render(<Restaurants />);

    await wait();

    const search = getByPlaceholderText("Search...");

    expect(search).toBeInTheDocument();

    act(() => {
      fireEvent.change(search, { target: { value: "Sushi" } });
    });

    await new Promise(r => setTimeout(r, 300));

    const restaurantCards = getAllByTestId("restaurant-card");
    const restaurantCard = restaurantCards[0];

    expect(restaurantCards).toHaveLength(1);
    expect(restaurantCard).toHaveTextContent(/Tanoshii Sushi/);
  });

  test("Should display error if getRestaurant is rejected", async () => {
    API.getRestaurant = jest.fn(() => Promise.reject("Error!"));

    const { getByText } = render(<Restaurants />);

    await wait();

    const error = getByText("Error!");
    expect(error).toBeInTheDocument();
  });
});
