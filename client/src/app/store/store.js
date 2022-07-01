import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../redux/auth/authSlice";
import postsSlice from "../redux/posts/postsSlice";
import usersSlice from "../redux/users/usersSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    posts: postsSlice,
    users: usersSlice,
  },
});
