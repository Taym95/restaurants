import { myAxios } from "./api";

const { CancelToken } = myAxios;

let cancel;

const cancellation = () => ({
  cancelToken: new CancelToken(function executor(canceller) {
    cancel = canceller;
  })
});

export const getRestaurant = async () => {
  const response = await myAxios.get(`restaurants/`, cancellation);
  return response.data.restaurants;
};
