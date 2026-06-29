import { ChatFiltersState } from '@/src/types/global';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ChatFiltersState = {
  updatedAt: {
    from: null,
    to: null,
  },
};

const chatsFilterSlice = createSlice({
  name: 'chatsFilters',
  initialState,
  reducers: {
    setChatsDate: (
      state,
      action: PayloadAction<{ from: string | null; to: string | null }>
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
