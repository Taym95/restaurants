export const loadRestaurants = (restaurants, dispatch) => {
  dispatch({
    type: "INIT",
    restaurants: restaurants
  });
};

export const onError = (data, dispatch) => {
  dispatch({
    type: "ERROR",
    error: data.toString()
  });
};

export const favorite = (restaurantId, dispatch) => {
  dispatch({
    type: "FAVORITE",
    restaurantId: restaurantId
  });
};
