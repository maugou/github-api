import { createAsyncThunk } from '@reduxjs/toolkit';

import { setData } from '../utils/storage';

const BOOKMARK_KEY = 'bookmark';

export const setBookmark = createAsyncThunk(
  'bookmark',
  async (repoName: string, { getState }: any) => {
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

    try {
      await setData(BOOKMARK_KEY, JSON.stringify(newBookmarks));
    } catch {}

    return newBookmarks;
  }
);
