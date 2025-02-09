import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../../utils/baseUrl";
import axios from "axios";
import { ChatState } from "@/Context/ChatProvider";
const apiPrefixChat = "api/v1/chat";

export function resetValue(value) {
  return function resetValue(dispatch, getState) {
    dispatch(chatSlices.actions.resetValue(value));
  };
}

export const fetchChats = createAsyncThunk(
  "chats/fetchChats",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseUrl}/${apiPrefixChat}`, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const accessChat = createAsyncThunk(
  "chats/accessChat",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `${baseUrl}/${apiPrefixChat}`,
        { userId: payload.userId },
        {
          withCredentials: true,
        }
      );
      if (payload.handleClose) {
        payload.handleClose();
      }
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const accessChatHackathon = createAsyncThunk(
  "chats/accessChatHackathon",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `${baseUrl}/${apiPrefixChat}/hackathon`,
        { hackathonId: payload.hackathonId },
        {
          withCredentials: true,
        }
      );
      if (payload.handleClose) {
        payload.handleClose();
      }
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const chatSlices = createSlice({
  name: "chats",
  initialState: {
    loading: false,
    popInner: false,
    appErr: null,
    chats: [],
    selectedChat: null,
  },
  reducers: {
    resetValue: (state, action) => {
      state[action.payload.key] = action.payload.value;
    },
  },
  extraReducers: (builder) => {
    // get all chats
    builder.addCase(fetchChats.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(fetchChats.fulfilled, (state, action) => {
        state.loading = false;
        state.chats = action?.payload;
        state.appErr = null;
      }),
      builder.addCase(fetchChats.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
      });
    builder.addCase(accessChat.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(accessChat.fulfilled, (state, action) => {
        state.loading = false;
        const newChat = action.payload;
        if (!state.chats.find((c) => c._id === newChat._id)) {
          state.chats.unshift(newChat); // Thêm chat mới vào đầu danh sách
        }
        state.selectedChat = newChat;
        state.appErr = null;
      }),
      builder.addCase(accessChat.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
      });
    builder.addCase(accessChatHackathon.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(accessChatHackathon.fulfilled, (state, action) => {
        state.loading = false;
        const newChat = action.payload;
        if (!state.chats.find((c) => c._id === newChat._id)) {
          state.chats.unshift(newChat); // Thêm chat mới vào đầu danh sách
        }
        state.selectedChat = newChat;
        state.appErr = null;
      }),
      builder.addCase(accessChatHackathon.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
      });
  },
});

export default chatSlices;
