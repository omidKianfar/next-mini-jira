import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// type
import { MyUserType, UserState } from "@/src/types/global";
import dayjs from "dayjs";

const initialState: UserState = {
  users: [],
  sortOrder: "desc",
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<MyUserType[]>) => {
      state.users = [...action.payload];

      state.users.sort((a, b) => {
        const aDate = a.createdAt ? dayjs(a.createdAt) : dayjs(0);
        const bDate = b.createdAt ? dayjs(b.createdAt) : dayjs(0);

        return state.sortOrder === "asc"
          ? aDate.diff(bDate)
          : bDate.diff(aDate);
      });
    },
    toggleSortByCreatedAt: (state) => {
      state.sortOrder = state.sortOrder === "asc" ? "desc" : "asc";

      state.users.sort((a, b) => {
        const aDate = a.createdAt ? dayjs(a.createdAt) : dayjs(0);
        const bDate = b.createdAt ? dayjs(b.createdAt) : dayjs(0);

        return state.sortOrder === "asc"
          ? aDate.diff(bDate)
          : bDate.diff(aDate);
      });
    },
    clearUsers: (state) => {
      state.users = [];
    },
  },
});

export const { setUsers, toggleSortByCreatedAt, clearUsers } =
  userSlice.actions;

export default userSlice.reducer;
