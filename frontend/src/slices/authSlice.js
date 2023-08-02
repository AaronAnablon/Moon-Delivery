import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { url, setHeaders } from "./api";
import {toast} from 'react-toastify'

const initialState = {
  token: localStorage.getItem("moon-delivery"),
  name: "",
  email: "",
  phoneNumber: "",
  address: "",
  _id: "",
  active: false,
  isAdmin: false,
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  userLoaded: false,
  activeLocation: [],
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (values, { rejectWithValue }) => {
    try {
      const token = await axios.post(`${url}/register`, {
        name: values.name,
        address: values.address,
        email: values.email,
        phoneNumber: values.phoneNumber,
        password: values.password,
        isAdmin: values.isAdmin,
        isRider: values.isRider,
        active: values.active,
      });

      localStorage.setItem("moon-delivery", token.data);

      return token.data;
    } catch (error) {
      //console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (values, { rejectWithValue }) => {
    try {
      const token = await axios.post(`${url}/login`, {
        email: values.email,
        password: values.password,
      });

      localStorage.setItem("moon-delivery", token.data);
      return token.data;
    } catch (error) {
      toast.error('Something Went Wrong!!')
      //console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (id, { rejectWithValue }) => {
    try {
      const token = await axios.get(`${url}/user/${id}`, setHeaders());

      localStorage.setItem("moon-delivery", token.data);

      return token.data;
    } catch (error) {
      //console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUser(state, action) {
      const token = state.token;

      if (token) {
        const user = jwtDecode(token);
        //console.log(user)
        return {
          ...state,
          token,
          name: user.name,
          address: user.address,
          email: user.email,
          phoneNumber: user.phoneNumber,
          _id: user._id,
          isAdmin: user.isAdmin,
          isRider: user.isRider,
          active: user.active,
          activeLocation: [{active: true, location: ''}],
          userLoaded: true,
        };
      } else return { ...state, userLoaded: true };
    },
    logoutUser(state, action) {
      localStorage.removeItem("moon-delivery");

      return {
        ...state,
        token: "",
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
        _id: "",
        active: false,
        isAdmin: false,
        isRider: false,
        registerStatus: "",
        registerError: "",
        loginStatus: "",
        loginError: "",
        activeLocation: [],
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      return { ...state, registerStatus: "pending" };
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload);
        return {
          ...state,
          token: action.payload,
          name: user.name,
          address: user.address,
          email: user.email,
          phoneNumber: user.phoneNumber,
          _id: user._id,
          isAdmin: user.isAdmin,
          isRider: user.isRider,
          active: user.active,
          registerStatus: "success",
          activeLocation: [{active: true, location: ''}],
        };
      } else return state;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      return {
        ...state,
        registerStatus: "rejected",
        registerError: action.payload,
      };
    });
    builder.addCase(loginUser.pending, (state, action) => {
      return { ...state, loginStatus: "pending" };
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload);
        return {
          ...state,
          token: action.payload,
          name: user.name,
          address: user.address,
          email: user.email,
          phoneNumber: user.phoneNumber,
          _id: user._id,
          isAdmin: user.isAdmin,
          isRider: user.isRider,
          active: user.active,
          loginStatus: "success",
          activeLocation: [{active: true, location: ''}],
        };
      } else return state;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,
        loginStatus: "rejected",
        loginError: action.payload,
      };
    });
    builder.addCase(getUser.pending, (state, action) => {
      return {
        ...state,
        getUserStatus: "pending",
      };
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload);
        return {
          ...state,
          token: action.payload,
          name: user.name,
          address: user.address,
          email: user.email,
          phoneNumber: user.phoneNumber,
          _id: user._id,
          isAdmin: user.isAdmin,
          isRider: user.isRider,
          active: user.active,
          activeLocation: user.activeLocation,
          getUserStatus: "success",
        };
      } else return state;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      return {
        ...state,
        getUserStatus: "rejected",
        getUserError: action.payload,
      };
    });
  },
});

export const { loadUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
