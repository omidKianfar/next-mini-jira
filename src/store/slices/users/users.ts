import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// type
import { MyUserType, UserState } from "@/src/types/global";

const initialState: UserState = {
  users: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<MyUserType[]>) => {
      state.users = action.payload;
    },

    clearUsers: (state) => {
      state.users = [];
    },
  },
});

export const { setUsers, clearUsers } = userSlice.actions;

export default userSlice.reducer;
