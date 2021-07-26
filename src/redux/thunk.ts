import { createAsyncThunk } from '@reduxjs/toolkit';
import Config from 'react-native-config';

import { setData } from '../utils/storage';
import { BOOKMARK_KEY } from '../constants';

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
