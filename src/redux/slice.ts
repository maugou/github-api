import { combineReducers, createSlice } from '@reduxjs/toolkit';
import { getBookmarkInfo, handleBookmark, searchRepositories } from './thunk';

type listState = string[];
const initList: listState = [];

type RepoState = { [k: string]: any };
const initRepoInfo: RepoState = {};

const repositories = createSlice({
  name: 'repositories',
  initialState: initRepoInfo,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getBookmarkInfo.fulfilled, (state, action) => {
      state[action.payload.full_name] = action.payload;
    });
    builder.addCase(searchRepositories.fulfilled, (state, action) => ({
      ...state,
      ...action.payload?.entities.repositories,
    }));
  },
});

const bookmarks = createSlice({
  name: 'bookmarks',
  initialState: initList,
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

const searchIds = createSlice({
  name: 'searchIds',
  initialState: initList,
  reducers: {
    resetSearchIds: () => [],
  },
  extraReducers: builder => {
    builder.addCase(searchRepositories.fulfilled, (state, action) => {
      action.payload?.result.items.forEach((repoName: string) => {
        if (!state.includes(repoName)) {
          state.push(repoName);
        }
      });
    });
  },
});

export const { setBookmark } = bookmarks.actions;
export const { resetSearchIds } = searchIds.actions;

export const rootReducer = combineReducers({
  repositories: repositories.reducer,
  bookmarks: bookmarks.reducer,
  searchIds: searchIds.reducer,
});
