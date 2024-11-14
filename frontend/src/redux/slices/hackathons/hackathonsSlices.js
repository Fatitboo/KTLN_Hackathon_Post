import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseUrl from "../../../utils/baseUrl";
import axios from "axios";
const apiPrefix = "api_v1/hackathons";

//get all hackathons
export const getAllHackathons = createAsyncThunk(
  "hackathons/getAllHackathons",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // const user = getState()?.users;
      // const { userAuth } = user;
      // // http call
      // const config = {
      //     headers: {
      //         Authorization: `Bearer ${userAuth?.user?.token}`,
      //         'Content-Type': 'application/json',
      //     },
      // };

      const { data } = await axios.get(`${baseUrl}/${apiPrefix}`);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
//create hackathon id
export const creatHackathonId = createAsyncThunk(
  "hackathons/createHackathonId",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // const user = getState()?.users;
      // const { userAuth } = user;
      // // http call
      // const config = {
      //     headers: {
      //         Authorization: `Bearer ${userAuth?.user?.token}`,
      //         'Content-Type': 'application/json',
      //     },
      // };

      const { data } = await axios.post(
        `${baseUrl}/${apiPrefix}/6713914e5cb4b783f0004058`,
        payload
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//update Hackathon Component
export const updateHackathonComponent = createAsyncThunk(
  "hackathons/updateHackathon",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const user = getState()?.users;
      const { userAuth } = user;
      // http call
      const config = {
        headers: {
          // Authorization: `Bearer ${userAuth?.user?.token}`,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `${baseUrl}/${apiPrefix}/${payload.id}`,
        { ...payload.hackathon },
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export function resetValue(value) {
  return function resetValue(dispatch, getState) {
    dispatch(hackathonsSlices.actions.resetValue(value));
  };
}

const hackathonsSlices = createSlice({
  name: "hackathons",
  initialState: {
    loadingCreate: false,
    loadingUpdate: false,
    isSuccess: false,
  },
  reducers: {
    resetValue: (state, action) => {
      state[action.payload.key] = action.payload.value;
    },
  },
  extraReducers: (builder) => {
    //get all vacancies
    builder.addCase(getAllHackathons.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(getAllHackathons.fulfilled, (state, action) => {
        state.loading = false;
        state.hackathons = action?.payload?.data;
      }),
      builder.addCase(getAllHackathons.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
      }),
      //create vacancies id
      builder.addCase(creatHackathonId.pending, (state, action) => {
        state.loadingCreate = true;
        state.isSuccess = false;
      }),
      builder.addCase(creatHackathonId.fulfilled, (state, action) => {
        state.loadingCreate = false;
        state.hackathonId = action?.payload.data.hackathonId;
        state.isSuccess = true;
      }),
      builder.addCase(creatHackathonId.rejected, (state, action) => {
        state.loadingCreate = false;
        state.isSuccess = false;
      });

    builder.addCase(updateHackathonComponent.pending, (state, action) => {
      state.loadingUpdate = true;
      state.isSuccessUD = false;
    }),
      builder.addCase(updateHackathonComponent.fulfilled, (state, action) => {
        state.loadingUpdate = false;
        state.isSuccessUD = true;
      }),
      builder.addCase(updateHackathonComponent.rejected, (state, action) => {
        state.loadingUpdate = true;
        state.isSuccessUD = false;
      });
  },
});

export default hackathonsSlices;
