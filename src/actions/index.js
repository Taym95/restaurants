export const loadRestaurants = (data, dispatch) => {
  dispatch({
    type: "INIT",
    restaurants: data.restaurants
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
