import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseUrl from "../../../utils/baseUrl";
import axios from "axios";
const apiPrefix = "api/v1/hackathons";

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

      const { data } = await axios.get(
        `${baseUrl}/${apiPrefix}?userId=${payload.userId}`
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

export const getAllHackathonsSeeker = createAsyncThunk(
  "hackathons/getAllHackathonsSeeker",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const params = {
        page: 1,
        limit: 10,
      };
      if (payload.search) params.search = payload.search;
      if (payload.selectedSort) params.sort = payload.selectedSort;
      if (payload.page) params.page = payload.page;
      if (payload.limit) params.limit = payload.limit;
      if (payload.selectedLocations && payload.selectedLocations.length > 0)
        params.location = payload.selectedLocations;
      if (payload.selectedStatus && payload.selectedStatus.length > 0)
        params.status = payload.selectedStatus;
      if (payload.selectedLength && payload.selectedLength.length > 0)
        params.length = payload.selectedLength;
      if (payload.selectedTags && payload.selectedTags.length > 0)
        params.tags = payload.selectedTags;
      if (payload.selectedHost) {
        if (payload.selectedHost[0] === "All") {
          params.hosts = [];
        } else {
          params.hosts = payload.selectedHost;
        }
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        params,
      };

      const { data } = await axios.get(
        `${baseUrl}/${apiPrefix}/search`,
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

export const getAllRegisteredUsersHackathon = createAsyncThunk(
  "hackathons/getAllRegisteredUsersHackathon",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const params = {
        page: 1,
        limit: 10,
      };
      if (payload.search) params.search = payload.search;
      if (payload.status) params.status = payload.status;
      if (payload.specialty) params.specialty = payload.specialty;
      if (payload.interestedIn) params.interestedIn = payload.interestedIn;
      if (payload.page) params.page = payload.page;
      if (payload.limit) params.limit = payload.limit;
      if (payload.sort) params.sort = payload.sort;
      if (payload.skills) {
        if (payload.skills[0] === "All") {
          params.skills = [];
        } else {
          params.skills = payload.skills;
        }
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        params,
      };

      const { data } = await axios.get(
        `${baseUrl}/${apiPrefix}/register-users/${payload.id}`,
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
//get all hackathons
export const singleHackathon = createAsyncThunk(
  "hackathons/singleHackathon",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const user = getState()?.users;
      const { userAuth } = user;
      // http call
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (userAuth) {
        console.log("🚀 ~ userAuth:", userAuth);
        config.params = { userId: userAuth?.user?.id };
      }

      const { data } = await axios.get(
        `${baseUrl}/${apiPrefix}/${payload}`,
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
//create hackathon id
export const creatHackathonId = createAsyncThunk(
  "hackathons/createHackathonId",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const user = getState()?.users;
      const { userAuth } = user;
      // // http call
      // const config = {
      //     headers: {
      //         Authorization: `Bearer ${userAuth?.user?.token}`,
      //         'Content-Type': 'application/json',
      //     },
      // };

      const { data } = await axios.post(
        `${baseUrl}/${apiPrefix}/${userAuth?.user?.id}`,
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
//delete Hackathon Component
export const deleteHackathonComponent = createAsyncThunk(
  "hackathons/deleteHackathon",
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
      const { data } = await axios.delete(
        `${baseUrl}/${apiPrefix}/${userAuth?.user?.id}/delete/${payload.id}`,
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
    //get all hackathons
    builder.addCase(getAllHackathons.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(getAllHackathons.fulfilled, (state, action) => {
        state.loading = false;
        state.hackathons = action?.payload;
      }),
      builder.addCase(getAllHackathons.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
      }),
      //get all hackathons seeker
      builder.addCase(getAllHackathonsSeeker.pending, (state, action) => {
        state.loading = true;
        state.isSuccess = false;
      }),
      builder.addCase(getAllHackathonsSeeker.fulfilled, (state, action) => {
        state.loading = false;
        state.hackathonsSeeker = action?.payload;
        state.isSuccess = true;
      }),
      builder.addCase(getAllHackathonsSeeker.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.isSuccess = false;
      }),
      builder.addCase(
        getAllRegisteredUsersHackathon.pending,
        (state, action) => {
          state.loading = true;
          state.isSuccess = false;
        }
      ),
      builder.addCase(
        getAllRegisteredUsersHackathon.fulfilled,
        (state, action) => {
          state.loading = false;
          state.registerUsers = action?.payload;
          state.isSuccess = true;
        }
      ),
      builder.addCase(
        getAllRegisteredUsersHackathon.rejected,
        (state, action) => {
          state.loading = false;
          state.appErr = action?.payload?.message;
          state.isSuccess = false;
        }
      ),
      //
      builder.addCase(singleHackathon.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(singleHackathon.fulfilled, (state, action) => {
        state.loading = false;
        state.hackathon = action?.payload;
      }),
      builder.addCase(singleHackathon.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
      }),
      //create vacancies id
      builder.addCase(creatHackathonId.pending, (state, action) => {
        state.loadingCreate = true;
        state.isSuccessHost = false;
      }),
      builder.addCase(creatHackathonId.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loadingCreate = false;
        state.hackathonId = action?.payload?.hackathonId;
        state.isSuccessHost = true;
      }),
      builder.addCase(creatHackathonId.rejected, (state, action) => {
        state.loadingCreate = false;
        state.isSuccessHost = false;
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

    builder.addCase(deleteHackathonComponent.pending, (state, action) => {
      state.loadingDelete = true;
      state.isSuccessDelete = false;
    }),
      builder.addCase(deleteHackathonComponent.fulfilled, (state, action) => {
        state.loadingDelete = false;
        state.isSuccessDelete = true;
      }),
      builder.addCase(deleteHackathonComponent.rejected, (state, action) => {
        state.loadingDelete = true;
        state.isSuccessDelete = false;
      });
  },
});

export default hackathonsSlices;
