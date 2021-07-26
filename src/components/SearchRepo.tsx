import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Config from 'react-native-config';
import Icon from 'react-native-vector-icons/Ionicons';

import { setBookmark } from '../redux/thunk';
import { RootState } from '../redux/store';

export const SearchRepo = () => {
  const [result, setResult] = useState([]);

  const bookmarks = useSelector((store: RootState) => store.bookmarks);
  const dispatch = useDispatch();

  const searchRepository = async ({
    nativeEvent,
  }: {
    nativeEvent: { text: string };
  }) => {
    const res = await fetch(
      `${Config.GITHUB_API}/search/repositories?q=${nativeEvent.text}`
    );
    const data = await res.json();

    setResult(data.items);
  };

  const toggleBookmark = (repo: string) => {
    if (bookmarks.length < 4 || bookmarks.includes(repo)) {
      dispatch(setBookmark(repo));
    }
  };

  const renderItem = ({ item }: { item: any }) => {
    const { full_name, description } = item;

    return (
      <>
        <TouchableOpacity style={styles.resultBox}>
          <Text style={styles.fullName}>{full_name}</Text>
          <Text>{description}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.starButton}
          onPress={() => toggleBookmark(full_name)}>
          {bookmarks.includes(full_name) ? (
            <Icon name="star" size={20} />
          ) : (
            <Icon name="star-outline" size={20} />
          )}
        </TouchableOpacity>
      </>
    );
  };

  const keyExtractor = (item: any) => item.id;

  const ItemSeparatorComponent = () => {
    return <View style={styles.divideLine} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBox}>
        <Icon name="logo-github" size={30} />
        <TextInput
          style={styles.textInput}
          placeholder="원하는 저장소를 검색해보세요"
          returnKeyType="search"
          onSubmitEditing={searchRepository}
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>
      <FlatList
        data={result}
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
  topBox: {
    backgroundColor: 'rgb(250, 250, 250)',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    height: 40,
    padding: 10,
    borderWidth: 0.4,
    borderColor: 'rgb(110, 110, 110)',
    borderRadius: 10,
    marginLeft: 10,
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
