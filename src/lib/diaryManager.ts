import { GetItem, SetItem } from "./LocalStore";

const MY_DIARY_KEY = "MyDiaries";

export async function GetDiary(diaryId: string) {
  const diaries = await GetMyDiaries();

  return diaries.find(d => d.id === diaryId);
}

export async function ClearDiaries() {
  await SetItem(MY_DIARY_KEY, []);
}
export async function GetMyDiaries() {
  var entries = await GetItem<IDiary[]>(MY_DIARY_KEY);
  
  if(entries) return entries;

  return [];
}

export async function AddOrUpdateDiary(entry: IDiary) {
  try {
    const currentEntries = await GetMyDiaries();

    const existing = currentEntries.find(e => e.id === entry.id);

    if(existing) {
      const existingIndex = currentEntries.indexOf(existing);
      currentEntries[existingIndex] = entry;
    }
    else {
      currentEntries.push(entry);
    }

    await SetItem(MY_DIARY_KEY, currentEntries);

  } catch (e) { 
    console.log(e);
  }
}