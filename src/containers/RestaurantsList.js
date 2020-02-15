import React from "react";
import { Card } from "semantic-ui-react";
import { RestaurantCard, Loading } from "../components";
import { sortByfavorite, sortByStatus } from "../utils";

const RestaurantsList = React.memo(({ restaurants, dispatch }) => {
  const restaurantsItems = restaurants
    //Because the array is frozen in strict mode, you'll need to copy the array before sorting it.
    .slice()
    .sort(sortByStatus)
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
