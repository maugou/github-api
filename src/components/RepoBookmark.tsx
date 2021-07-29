import React, { useCallback } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { RootState } from '../redux/store';
import { handleBookmark } from '../redux/thunk';

export const RepoBookmark = () => {
  const bookmarks = useSelector((store: RootState) => store.bookmarks);
  const repositories = useSelector((store: RootState) => store.repositories);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const renderItem = ({ item }: { item: string }) => {
    const { full_name, description, html_url } = repositories[item];

    return (
      <>
        <TouchableOpacity
          style={styles.resultBox}
          onPress={() => navigation.navigate('WebPage', { uri: html_url })}>
          <Text style={styles.fullName}>{full_name}</Text>
          <Text>{description}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.starButton}
          onPress={() => {
            if (bookmarks.length < 4 || bookmarks.includes(full_name)) {
              dispatch(handleBookmark(full_name));
            }
          }}>
          {bookmarks.includes(full_name) ? (
            <Icon name="star" size={20} />
          ) : (
            <Icon name="star-outline" size={20} />
          )}
        </TouchableOpacity>
      </>
    );
  };

  const keyExtractor = useCallback((item: any) => item, []);

  const ItemSeparatorComponent = () => {
    return <View style={styles.divideLine} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={bookmarks}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={ItemSeparatorComponent}
        showsVerticalScrollIndicator={false}
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
  fullName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  starButton: {
    position: 'absolute',
    right: 20,
    top: 10,
    padding: 6,
  },
  divideLine: {
    borderWidth: 0.5,
    borderColor: 'rgb(210, 210, 210)',
    marginHorizontal: 10,
  },
});
