import axios from "axios";

const options = {
  baseURL: process.env.REACT_APP_RICK_AND_MORTY_API
};
const myAxios = axios.create(options);
myAxios.defaults.timeout = 2500;

export { myAxios };
