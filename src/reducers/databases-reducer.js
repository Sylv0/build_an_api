import { API_GET_DATABASES } from "../actions/databases-actions";

export default function databasesReducer(state = [], {type, payload}) {

    switch(type){
        case API_GET_DATABASES:
            return payload;

        default:
            return state;
    }
}