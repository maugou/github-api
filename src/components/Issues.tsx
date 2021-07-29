import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { RootState } from '../redux/store';
import { getIssues } from '../redux/thunk';
import { resetIssueIds } from '../redux/slice';
import { ListFooterComponent } from './layout/ListFooter';

export const Issues = () => {
  const [page, setPage] = useState(1);
  const [isBottomLoading, setisBottomLoading] = useState(false);

  const issueIds = useSelector((store: RootState) => store.issueIds);
  const issues = useSelector((store: RootState) => store.issues);
  const bookmarks = useSelector((store: RootState) => store.bookmarks);
  const endRepos = useSelector((store: RootState) => store.pagination.endRepos);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetIssueIds());

    bookmarks.forEach(repoName => {
      dispatch(getIssues({ repoName, page: 1 }));
    });

    setPage(prevPage => prevPage + 1);
  }, [bookmarks, dispatch]);

  const getMoreIssues = useCallback(async () => {
    if (bookmarks.length !== endRepos.length) {
      setisBottomLoading(true);

      const moreIssuesRepos = bookmarks.filter(
        bookmark => !endRepos.includes(bookmark)
      );

      await Promise.all(
        moreIssuesRepos.map(repoName => {
          dispatch(getIssues({ repoName, page }));
        })
      );

      setPage(prevPage => prevPage + 1);

      setisBottomLoading(false);
    }
  }, [bookmarks, endRepos, dispatch, page]);

  const renderItem = useCallback(
    ({ item }: { item: number }) => {
      const { full_name, title, html_url, state } = issues[item];
      let issueStateStyle: any = [styles.issueState];

      if (state === 'closed') {
        issueStateStyle.push({
          color: 'rgb(102, 102, 102)',
          borderColor: 'rgb(102, 102, 102)',
        });
      }

      return (
        <>
          <TouchableOpacity
            style={styles.resultBox}
            onPress={() => navigation.navigate('WebPage', { uri: html_url })}>
            <View style={styles.repoInfo}>
              <Text style={styles.fullName}>{full_name}</Text>
              <Text style={issueStateStyle}>{state}</Text>
            </View>
            <Text>{title}</Text>
          </TouchableOpacity>
        </>
      );
    },
    [issues, navigation]
  );

  const keyExtractor = useCallback((item: any) => item, []);

  const ItemSeparatorComponent = () => {
    return <View style={styles.divideLine} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={issueIds.slice().sort((a, b) => b - a)}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={ItemSeparatorComponent}
        showsVerticalScrollIndicator={false}
        onEndReached={getMoreIssues}
        onEndReachedThreshold={0}
        ListFooterComponent={
          <ListFooterComponent isBottomLoading={isBottomLoading} />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255, 255, 255)',
  },
  resultBox: {
    marginVertical: 10,
    padding: 10,
    margin: 10,
  },
  repoInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  fullName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  issueState: {
    color: 'rgb(000, 102, 000)',
    borderWidth: 1,
    borderRadius: 7,
    borderColor: 'rgb(000, 102, 000)',
    paddingHorizontal: 4,
  },
  divideLine: {
    borderWidth: 0.5,
    borderColor: 'rgb(210, 210, 210)',
    marginHorizontal: 10,
  },
});
