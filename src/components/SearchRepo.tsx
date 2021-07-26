import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';

import {
  getBookmarkInfo,
  handleBookmark,
  searchRepositories,
} from '../redux/thunk';
import { RootState } from '../redux/store';
import { getData } from '../utils/storage';
import { BOOKMARK_KEY } from '../constants';
import { resetSearchIds, setBookmark } from '../redux/slice';
import { ListFooterComponent } from './layout/ListFooter';
import { useNavigation } from '@react-navigation/native';

export const SearchRepo = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [isBottomLoading, setisBottomLoading] = useState(false);

  const repositories = useSelector((store: RootState) => store.repositories);
  const bookmarks = useSelector((store: RootState) => store.bookmarks);
  const searchIds = useSelector((store: RootState) => store.searchIds);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    const setInitBookmark = async () => {
      const storageData = await getData(BOOKMARK_KEY);

      if (storageData.length !== 0) {
        await Promise.all(
          storageData.map((repoName: string) => {
            dispatch(getBookmarkInfo(repoName));
          })
        );

        dispatch(setBookmark(storageData));
      }
    };

    setInitBookmark();
  }, []);

  const searchRepo = async ({
    nativeEvent,
  }: {
    nativeEvent: { text: string };
  }) => {
    await dispatch(resetSearchIds());
    dispatch(searchRepositories({ searchText: nativeEvent.text, page: 1 }));

    setSearchText(nativeEvent.text);
    setPage(prevPage => prevPage + 1);
  };

  const getMoreRepositories = async () => {
    if (searchIds.length % 30 === 0) {
      setisBottomLoading(true);

      await dispatch(searchRepositories({ searchText, page }));
      setPage(prevPage => prevPage + 1);

      setisBottomLoading(false);
    }
  };

  const toggleBookmark = (repo: string) => {
    if (bookmarks.length < 4 || bookmarks.includes(repo)) {
      dispatch(handleBookmark(repo));
    } else {
      setIsModalVisible(true);
    }
  };

  const renderItem = ({ item }: { item: any }) => {
    const { full_name, description, html_url } = repositories[item];

    return (
      <>
        <TouchableOpacity
          style={styles.resultBox}
          onPress={() => navigation.navigate('RepoDetail', { uri: html_url })}>
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

  const keyExtractor = (item: any) => item;

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
          onSubmitEditing={searchRepo}
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>
      <FlatList
        data={searchIds}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        onEndReached={getMoreRepositories}
        onEndReachedThreshold={0}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListFooterComponent={
          <ListFooterComponent isBottomLoading={isBottomLoading} />
        }
      />

      <Modal isVisible={isModalVisible} style={styles.modalContainer}>
        <View style={styles.modalTextBox}>
          <Text style={styles.modalText}>관심 등록은 4개가 최대입니다.</Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => setIsModalVisible(false)}>
            <Text>확인</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const deviceWidth = Dimensions.get('window').width;

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
    marginRight: 24,
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
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTextBox: {
    width: deviceWidth / 1.6,
    height: 160,
    backgroundColor: 'rgb(240, 240, 240)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    flex: 1,
    fontSize: 16,
    paddingTop: 40,
  },
  modalButton: {
    width: deviceWidth / 1.6,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 0.3,
    borderColor: 'rgb(180, 180, 180)',
  },
});
