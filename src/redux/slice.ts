import { combineReducers, createSlice } from '@reduxjs/toolkit';
import { setBookmark } from './thunk';

type BookmarkState = string[];
const initBookmark: BookmarkState = [];

const bookmarks = createSlice({
  name: 'bookmarks',
  initialState: initBookmark,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setBookmark.fulfilled, (state, action) => action.payload);
  },
});

export const rootReducer = combineReducers({
  bookmarks: bookmarks.reducer,
});
