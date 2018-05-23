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

export async function DeleteDiary(did: string) {
  const diaries = await GetMyDiaries();

  const act = diaries.find(d => d.id === did);

  if(act) {
    if(diaries.length === 1) {
      await ClearDiaries();
    }
    else {
      const idx = diaries.indexOf(act);
      const altered = diaries.splice(idx, 1);
      await SetItem(MY_DIARY_KEY, altered);
    }
  }
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