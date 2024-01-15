import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "./userActions";

const initialState = {
  id: "",
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: () => initialState,
    login: (state, action) => (state = action.payload),
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state, action) => {
      state.id = null;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      return initialState;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectUserState = (state) => state.user;
export const userActions = userSlice.actions;
export default userSlice;
