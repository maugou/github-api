import { combineReducers, createSlice } from '@reduxjs/toolkit';
import { getBookmarkInfo, handleBookmark } from './thunk';

type BookmarkState = string[];
const initBookmark: BookmarkState = [];

const bookmarks = createSlice({
  name: 'bookmarks',
  initialState: initBookmark,
  reducers: {
    setBookmark: (state, action) => action.payload,
  },
  extraReducers: builder => {
    builder.addCase(
      handleBookmark.fulfilled,
      (state, action) => action.payload
    );
  },
});

type RepoState = { [k: string]: any };
const initRepoInfo: RepoState = [];

const repositories = createSlice({
  name: 'repositories',
  initialState: initRepoInfo,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getBookmarkInfo.fulfilled, (state, action) => {
      state[action.payload.full_name] = action.payload;
    });
  },
});

export const { setBookmark } = bookmarks.actions;

export const rootReducer = combineReducers({
  bookmarks: bookmarks.reducer,
  repositories: repositories.reducer,
});
