import AsyncStorage from '@react-native-async-storage/async-storage';

const PREMIUM_KEY = '@astromatch:premium';
export const FREE_FAVORITE_LIMIT = 5;

export const getPremiumStatus = async () => {
  const stored = await AsyncStorage.getItem(PREMIUM_KEY);
  return stored ? JSON.parse(stored) : { active: false };
};

export const setPremiumStatus = async (active) => {
  const value = { active, activatedAt: new Date().toISOString() };
  await AsyncStorage.setItem(PREMIUM_KEY, JSON.stringify(value));
  return value;
};
