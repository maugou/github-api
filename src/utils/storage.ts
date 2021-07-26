import AsyncStorage from '@react-native-async-storage/async-storage';

export const setData = async (key: string, value: any) => {
  await AsyncStorage.setItem(key, value);
};

export const getData = async (key: string) => {
  try {
    const res = await AsyncStorage.getItem(key);
    const bookmark = res ? JSON.parse(res) : [];

    return bookmark;
  } catch {}
};
