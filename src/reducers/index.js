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
      return state;
    case "ERROR":
      return produce(state, draftState => {
        draftState.error = error;
      });
    default:
      return state;
  }
};
