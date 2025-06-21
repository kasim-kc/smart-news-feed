import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "cached_articles";

export const saveArticles = async (articles) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
  } catch (e) {
    console.error("Saving failed", e);
  }
};

export const loadArticles = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Loading failed", e);
    return [];
  }
};
