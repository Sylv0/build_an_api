import { combineReducers } from "redux";

import databasesReducer from "./databases-reducer";
import routesReducer from "./routes-reducer";

const reducers = combineReducers({
    databases: databasesReducer,
    routes: routesReducer
})

export default reducers;