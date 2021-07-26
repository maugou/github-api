import { createAsyncThunk } from '@reduxjs/toolkit';
import Config from 'react-native-config';
import { normalize } from 'normalizr';

import { setData } from '../utils/storage';
import { BOOKMARK_KEY } from '../constants';
import { repositoryEntity } from './schemas';

export const handleBookmark = createAsyncThunk(
  'bookmark/toggle',
  async (repoName: string, { getState }: any) => {
    try {
      const { bookmarks } = getState();
      const index = bookmarks.findIndex(
        (bookmark: string) => bookmark === repoName
      );

      let newBookmarks = [...bookmarks];

      if (index === -1) {
        newBookmarks.push(repoName);
      } else {
        newBookmarks.splice(index, 1);
      }

      await setData(BOOKMARK_KEY, JSON.stringify(newBookmarks));

      return newBookmarks;
    } catch {}
  }
);

export const getBookmarkInfo = createAsyncThunk(
  'repository/get',
  async (repoName: string) => {
    try {
      const res = await fetch(`${Config.GITHUB_API}/repos/${repoName}`);
      const repoData = await res.json();

      return repoData;
    } catch {}
  }
);

export const searchRepositories = createAsyncThunk(
  'repositories/search',
  async (arg: { searchText: string; page: number }) => {
    const { searchText, page } = arg;
    try {
      const res = await fetch(
        `${Config.GITHUB_API}/search/repositories?q=${searchText}&page=${page}`
      );

      const data = await res.json();

      const repositorySchema = { items: [repositoryEntity] };
      const repositories = normalize(data, repositorySchema);

      return repositories;
    } catch {}
  }
);
