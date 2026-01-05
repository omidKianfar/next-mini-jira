import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// type
import { ChatFiltersState } from "@/src/types/global";

const initialState: ChatFiltersState = {
  updatedAt: {
    from: null,
    to: null,
  },
};

const chatsFilterSlice = createSlice({
  name: "usersFilters",
  initialState,
  reducers: {
    setChatsDate: (
      state,
      action: PayloadAction<{ from: string | null; to: string | null }>,
    ) => {
      state.updatedAt = action.payload;
    },

    resetChatsFilters: (state) => {
      state.updatedAt = { from: null, to: null };
    },
  },
});

export const { setChatsDate, resetChatsFilters } = chatsFilterSlice.actions;

export default chatsFilterSlice.reducer;
