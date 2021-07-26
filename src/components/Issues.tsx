import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { RootState } from '../redux/store';
import {} from '../redux/thunk';

export const Issues = () => {
  const issueIds = useSelector((store: RootState) => store.issueIds);
  const issues = useSelector((store: RootState) => store.issues);

  const navigation = useNavigation();

  const renderItem = ({ item }: { item: number }) => {
    const { full_name, title, html_url } = issues[item];

    return (
      <>
        <TouchableOpacity
          style={styles.resultBox}
          onPress={() => navigation.navigate('RepoDetail', { uri: html_url })}>
          <Text style={styles.fullName}>{full_name}</Text>
          <Text>{title}</Text>
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
      <FlatList
        data={issueIds}
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
  divideLine: {
    borderWidth: 0.5,
    borderColor: 'rgb(210, 210, 210)',
    marginHorizontal: 10,
  },
});
