import config from '@config/app';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = config.storage.key;

export async function store_session(data: any) {
  try {
    const current = await get_session();
    const stored = Object.assign(current, data);
    const value = JSON.stringify(stored);
    await AsyncStorage.setItem(KEY, value);
  } catch (e) {
    
  }
}

export async function delete_session() {
  try {
    await AsyncStorage.setItem(KEY, '{}');
  } catch (e) {
    
  }
}

export async function get_session(key: string = '') {
  try {
    const value = await AsyncStorage.getItem(KEY)
    const data = value ? JSON.parse(value) : {};
    if (key === '') return data;
    else {
      const keys = key.split('.');
      let result = data;
      for (const k of keys) {
        if (result instanceof Object && k in result) result = result[k];
        else {
          result = undefined;
          break;
        }
      }
      return result;
    }
  } catch (e) {
    return undefined;
  }
}