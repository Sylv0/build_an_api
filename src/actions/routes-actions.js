import axios from "axios";

export const API_GET_ROUTES = "routes:getAll";

export function getRoutesAction(data) {
  return {
    type: API_GET_ROUTES,
    payload: data
  };
}

export function getRoutes() {
  return dispatch => {
    axios
      .get(`${process.env.REACT_APP_API}/build/routes`)
      .then(res => {
        dispatch(getRoutesAction(res.data));
      })
      .catch(console.log);
  };
}
