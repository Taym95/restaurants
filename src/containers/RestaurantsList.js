import React from "react";
import { Card } from "semantic-ui-react";
import { RestaurantCard, Loading } from "../components";
import { sortByfavorite } from "../utils";

const RestaurantsList = React.memo(({ restaurants, dispatch }) => {
  const restaurantsItems = restaurants
    .slice()
    .sort(sortByfavorite)
    .map((restaurant, index) => (
      <RestaurantCard key={restaurant.id} {...restaurant} dispatch={dispatch} />
    ));

  return restaurants.length === 0 ? (
    <Loading />
  ) : (
    <Card.Group data-testid="restaurants-list" itemsPerRow={3}>
      {restaurantsItems}
    </Card.Group>
  );
});

export { RestaurantsList };
