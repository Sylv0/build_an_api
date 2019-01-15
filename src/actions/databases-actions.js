import axios from "axios";

export const API_GET_DATABASES = "databases:getAll";

export function getDatabasesAction(data) {
  return {
    type: API_GET_DATABASES,
    payload: data
  };
}

export function getDatabases() {
  return dispatch => {
    axios
      .get(`${process.env.REACT_APP_API}/build/databases`)
      .then(res => {
        console.log(res);
        dispatch(getDatabasesAction(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export const API_SAVE_DATABASE = "databases:saveNew";

export function saveDatabaseAction(data) {
  return {
    type: API_SAVE_DATABASE,
    payload: data
  };
}

export function saveDatabase(data) {
  console.log(data);
}
