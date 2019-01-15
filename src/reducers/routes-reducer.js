import { API_GET_ROUTES } from "../actions/routes-actions";

export default function routesReducer(state = [], { type, payload }) {
  switch (type) {
    case API_GET_ROUTES:
      return payload;

    default:
      return state;
  }
}
