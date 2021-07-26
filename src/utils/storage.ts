import AsyncStorage from '@react-native-async-storage/async-storage';

export const setData = async (key: string, value: any) => {
  await AsyncStorage.setItem(key, value);
};

export const getData = async (key: string) => {
  await AsyncStorage.getItem(key);
};
