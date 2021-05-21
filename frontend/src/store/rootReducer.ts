import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import noteDetailsReducer from "../features/notes/noteDetailsSlice";
import noteListReducer from "../features/notes/noteListSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  noteDetails: noteDetailsReducer,
  noteList: noteListReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
