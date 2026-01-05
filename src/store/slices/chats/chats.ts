import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// type
import { chatsState, ChatsType } from "@/src/types/global";

const initialState: chatsState = {
  chats: [],
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<ChatsType[]>) => {
      state.chats = [...action.payload];
    },
  },
});

export const { setChats } = chatsSlice.actions;

export default chatsSlice.reducer;
