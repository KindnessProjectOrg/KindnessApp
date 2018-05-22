//import { FileSystem } from "expo";
import { AsyncStorage } from 'react-native';

//const KeyToFileUri = (key: string) => `file://${key}.json`;

export async function Store<T>(key: string, val: T) {
  try {
    //var uri = KeyToFileUri(key);
    //await FileSystem.writeAsStringAsync(uri, JSON.stringify(val));
    await AsyncStorage.setItem(key, JSON.stringify(val));
  } catch{ }
}

export async function Get<T>(key: string) {
  try {
    //var uri = KeyToFileUri(key);
    //var json = await FileSystem.readAsStringAsync(uri);
    var json = await AsyncStorage.getItem(key);
    return JSON.parse(json) as T;
  } catch{ }

  return null;
}