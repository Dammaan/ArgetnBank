import { createSlice } from "@reduxjs/toolkit";

const persistedAuth = JSON.parse(localStorage.getItem("auth"));

const initialState = {
  isAuthenticated: !!persistedAuth,
  user: persistedAuth?.user || {
    userName: "",
    firstName: "",
    lastName: "",
  },
  token: persistedAuth?.token || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.isAuthenticated = true;
      state.user = {
        userName: action.payload.userName,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
      };
      state.token = action.payload.token;

      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: state.user,
          token: state.token,
        })
      );
    },

    signOut: (state) => {
      state.isAuthenticated = false;
      state.user = {
        userName: "",
        firstName: "",
        lastName: "",
      };
      state.token = null;
      localStorage.removeItem("auth");
    },

    updateUserName: (state, action) => {
      state.user.userName = action.payload;

      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: state.user,
          token: state.token,
        })
      );
    },
  },
});

export const { signIn, signOut, updateUserName } = authSlice.actions;
export default authSlice.reducer;
