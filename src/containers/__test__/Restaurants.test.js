import * as React from "react";
import { render, fireEvent, act, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { RestaurantsList } from "../RestaurantsList";

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

describe("Containers tests", () => {
  afterEach(cleanup);

  test("should display Loader if restaurants list is empty ", async () => {
    const { getByTestId } = render(<RestaurantsList restaurants={[]} />);
    const Loader = await getByTestId("loading");
    expect(Loader).toBeInTheDocument();
  });

  test("should display restaurants card list if restaurants is not empty ", async () => {
    const { getByTestId, getAllByTestId } = render(
      <RestaurantsList restaurants={mockData.restaurants} />
    );
    const restaurantsList = await getByTestId("restaurants-list");
    const restaurantCards = await getAllByTestId("restaurant-card");

    expect(restaurantsList).toBeInTheDocument();
    expect(restaurantCards).toHaveLength(2);
  });

  test("should display restaurant name if restaurants list is provided", async () => {
    const { getByText } = render(
      <RestaurantsList restaurants={mockData.restaurants} />
    );
    const restaurantName = await getByText(/Tanoshii Sushi/);

    expect(restaurantName).toBeInTheDocument();
  });
});
