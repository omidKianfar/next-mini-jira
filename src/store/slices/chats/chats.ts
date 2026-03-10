import {
  chatsState,
  ChatsType,
  createSlice,
  PayloadAction,
} from '../../imports';

const initialState: chatsState = {
  chats: [],
};

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<ChatsType[]>) => {
      state.chats = [...action.payload];
    },
  },
});

export const { setChats } = chatsSlice.actions;

export default chatsSlice.reducer;
