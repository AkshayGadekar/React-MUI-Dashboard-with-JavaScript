import axios from 'axios';
import apiEndPoints from "../../apiEndPoints"
import authAxios from '../../axios.js';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {clearAuth} from '../../axios.js';

const initialState = {
  isLoggedIn: null,
  user: {}
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loggedIn: (state, action) => {
      if (action.payload === false) {
        clearAuth();
      }
      state.isLoggedIn = action.payload;
    },
    gotUser: (state, action) => {
      state.user = action.payload;
    }
  }
})

export default userSlice.reducer;
export const { loggedIn, gotUser } = userSlice.actions;
