import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";

//create verification token
export const accVerificationSendTokenAction = createAsyncThunk(
  "account/token",
  async (email, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    // http call
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.user?.token}`,
        "Content-Type": "application/json",
      },
    };
    //http call
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/v1/auth/send-token-verify-by-email/${userAuth?.user?.id}`,
        {},
        config
      );
      console.log(data);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Verify Account
export const verifyAccountAction = createAsyncThunk(
  "account/verify",
  async (token, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    // http call
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.user?.token}`,
        "Content-Type": "application/json",
      },
      params: {
        token,
      },
    };
    //http call

    try {
      const { data } = await axios.put(
        `${baseUrl}/api/v1/auth/update-token-verify`,
        {},
        config
      );
      //dispatch
      // dispatch(resetAcc());
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      console.log(error?.response?.data);
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const resetSuccessAction = createAsyncThunk(
  "account/resetSuccess",
  async (data, { rejectWithValue, getState, dispatch }) => {
    try {
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
//slices

const accountVericationSlices = createSlice({
  name: "account",
  initialState: {},
  extraReducers: (builder) => {
    //create
    builder.addCase(accVerificationSendTokenAction.pending, (state, action) => {
      state.loading = true;
      state.isSuccess = false;
    });
    builder.addCase(
      accVerificationSendTokenAction.fulfilled,
      (state, action) => {
        state.token = action?.payload?.token;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
        state.isSuccess = true;
      }
    );
    builder.addCase(
      accVerificationSendTokenAction.rejected,
      (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
        state.isSuccess = false;
      }
    );

    //Verify account
    builder.addCase(verifyAccountAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(verifyAccountAction.fulfilled, (state, action) => {
      state.verified = action?.payload?.userVerify;
      state.isVerified = true;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(verifyAccountAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    builder.addCase(resetSuccessAction.fulfilled, (state, action) => {
      state.isSuccess = false;
    });
  },
});

export default accountVericationSlices;
