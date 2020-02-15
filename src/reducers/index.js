import { produce } from "immer";

export const restaurantsInitialState = {
  restaurants: [],
  error: null
};

export const restaurantsReducer = (
  state,
  { type, restaurants, restaurantId, error }
) => {
  switch (type) {
    case "INIT":
      return {
        restaurants
      };
    case "FAVORITE":
      return produce(state, draftState => {
        draftState.restaurants.forEach(restaurant => {
          if (restaurant.id === restaurantId)
            restaurant.isFavorite = !restaurant.isFavorite;
        });
      });
    case "ERROR":
      return produce(state, draftState => {
        draftState.error = error;
      });
    default:
      return state;
  }
};
