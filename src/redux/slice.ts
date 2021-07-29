import { combineReducers, createSlice } from '@reduxjs/toolkit';
import {
  getBookmarkInfo,
  getIssues,
  handleBookmark,
  searchRepositories,
} from './thunk';

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

type issueState = { [k: number]: any };
const issueList: issueState = {};

const issues = createSlice({
  name: 'issues',
  initialState: issueList,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getIssues.rejected, (state, action) => ({
      ...state,
    }));
    builder.addCase(getIssues.fulfilled, (state, action) => {
      const { result, ...issuesInfo } = action.payload;

      return {
        ...state,
        ...issuesInfo,
      };
    });
  },
});

type listState = string[];
const initList: listState = [];

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

type issueIdState = number[];
const issueIdList: issueIdState = [];

const issueIds = createSlice({
  name: 'issueIds',
  initialState: issueIdList,
  reducers: {
    resetIssueIds: () => [],
  },
  extraReducers: builder => {
    builder.addCase(getIssues.fulfilled, (state, action) => {
      action.payload?.result.forEach((id: number) => {
        if (!state.includes(id)) {
          state.push(id);
        }
      });
    });
  },
});

type Pagination = {
  searchTotalCount?: number;
  endRepos: string[];
};
const initPageState: Pagination = { endRepos: [] };

const pagination = createSlice({
  name: 'pagination',
  initialState: initPageState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(searchRepositories.fulfilled, (state, action) => {
      state.searchTotalCount = action.payload?.result.total_count;
    });
    builder.addCase(getIssues.rejected, (state, action) => {
      state.endRepos?.push(action.meta.arg.repoName);
    });
    builder.addCase(handleBookmark.fulfilled, (state, action) => {
      state.endRepos = state.endRepos.filter(repoName =>
        action.payload!.includes(repoName)
      );
    });
  },
});

export const { setBookmark } = bookmarks.actions;
export const { resetSearchIds } = searchIds.actions;
export const { resetIssueIds } = issueIds.actions;

export const rootReducer = combineReducers({
  repositories: repositories.reducer,
  issues: issues.reducer,
  bookmarks: bookmarks.reducer,
  searchIds: searchIds.reducer,
  issueIds: issueIds.reducer,
  pagination: pagination.reducer,
});
