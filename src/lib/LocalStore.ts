import { AsyncStorage } from "react-native";


const USER_KEY = "CURRENT_USER";

export async function SetItem<T>(key: string, val: T) {
  var asStr = val ? JSON.stringify(val) : null;
  try {
    if (asStr) {
      await AsyncStorage.setItem(key, asStr);
    }
    await AsyncStorage.removeItem(key);
  } catch (er) {
    console.log(er);
  }
}

export async function GetItem<T>(key: string) {
  const itemStr = await AsyncStorage.getItem(key);

  if(itemStr) {
    return JSON.parse(itemStr) as T;
  }

  return null;
}


export function SaveUser(u: IFirebaseUser) {
  return AsyncStorage.setItem(USER_KEY, JSON.stringify(u));
}

export async function GetUser() {
  try {
    return await GetItem<IFirebaseUser>(USER_KEY);
  } catch (er) {
    console.error(er);
  }

  return null;
}

export function AddOrUpdateDiary(d: IDiary) {
  return StoreDiary(d);
}

export async function GetDiary(id: string) {
  if(id) {
    const key = diaryKey(id);
    return await GetItem<IDiary>(key);
  }

  return null;
}

export async function StoreDiary(d: IDiary) {
  if(d) {
    const key = diaryKey(d.id);
    await SetItem(key, d);
  }
}

function diaryKey(id: string) {
  return `Diary_${id}`;
}