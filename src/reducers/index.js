import { produce } from "immer";

export const restaurantsInitialState = {
  restaurants: [],
  filter: { searchValue: null, sortingValue: null },
  error: null
};

export const restaurantsReducer = (
  state,
  { type, restaurants, restaurantId, error, sortingValue, searchValue }
) => {
  switch (type) {
    case "INIT":
      return produce(state, draftState => {
        draftState.restaurants = restaurants;
      });
    case "FAVORITE":
      return produce(state, draftState => {
        draftState.restaurants.forEach(restaurant => {
          if (restaurant.id === restaurantId)
            restaurant.isFavorite = !restaurant.isFavorite;
        });
      });
    case "FILTER":
      return produce(state, draftState => {
        draftState.filter.sortingValue = sortingValue;
      });
    case "SEARCH":
      return produce(state, draftState => {
        draftState.filter.searchValue = searchValue;
      });
    case "ERROR":
      return produce(state, draftState => {
        draftState.error = error;
      });
    default:
      return state;
  }
};
