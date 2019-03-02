import {
  API_GET_DATABASES,
  API_SAVE_DATABASE
} from "../actions/databases-actions"

export default function databasesReducer(state = [], { type, payload }) {
  switch (type) {
    case API_GET_DATABASES:
      return payload

    case API_SAVE_DATABASE:
      // console.log(payload)
      state.push(payload.route)
      console.log(state);
      
      return state

    default:
      return state
  }
}
