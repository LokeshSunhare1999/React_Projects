import { combineReducers } from "redux";
import usersReducer from "./reducer";

const rootRedcuer = combineReducers({
    data: usersReducer
})

export default rootRedcuer;