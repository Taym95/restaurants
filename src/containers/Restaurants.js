import React, { useEffect } from "react";
import { Error, Filter } from "../components";
import { RestaurantsList } from "./RestaurantsList";
import { getRestaurant } from "../api";
import { restaurantsReducer, restaurantsInitialState } from "../reducers";
import { loadRestaurants, onError } from "../actions";

const Restaurants = React.memo(() => {
  const [state, dispatch] = React.useReducer(
    restaurantsReducer,
    restaurantsInitialState
  );
  useEffect(() => {
    getRestaurant()
      .then(data => {
        loadRestaurants(data, dispatch);
      })
      // Handling fetches data errors:
      // of course, we can do better than logging or throwing an error
      // we can show a not found screen
      // or if we are using sentry we can send the error to sentry
      // I will dispatch "ERROR" action with error to show the error on UI
      .catch(error => {
        onError(error, dispatch);
      });
  }, []);

  return (
    <>
      <Filter dispatch={dispatch} />
      {state.error ? (
        <Error error={state.error} />
      ) : (
        <RestaurantsList restaurants={state.restaurants} dispatch={dispatch} />
      )}
    </>
  );
});

export { Restaurants };
