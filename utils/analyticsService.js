import AsyncStorage from '@react-native-async-storage/async-storage';

const PROFILE_VIEWS_KEY = '@astromatch:profile-views';
const MATCH_SUCCESS_KEY = '@astromatch:match-success';
const ACTIVITY_KEY = '@astromatch:activity';

export const incrementProfileView = async (userId = 'self') => {
  const stored = await AsyncStorage.getItem(PROFILE_VIEWS_KEY);
  const data = stored ? JSON.parse(stored) : {};
  data[userId] = (data[userId] || 0) + 1;
  await AsyncStorage.setItem(PROFILE_VIEWS_KEY, JSON.stringify(data));
  return data[userId];
};

export const getProfileViews = async () => {
  const stored = await AsyncStorage.getItem(PROFILE_VIEWS_KEY);
  const data = stored ? JSON.parse(stored) : {};
  const total = Object.values(data).reduce((sum, v) => sum + v, 0);
  return { data, total };
};

export const recordMatchSuccess = async () => {
  const stored = await AsyncStorage.getItem(MATCH_SUCCESS_KEY);
  const num = stored ? Number(stored) : 0;
  const next = num + 1;
  await AsyncStorage.setItem(MATCH_SUCCESS_KEY, String(next));
  return next;
};

export const getMatchSuccessCount = async () => {
  const stored = await AsyncStorage.getItem(MATCH_SUCCESS_KEY);
  return stored ? Number(stored) : 0;
};

export const recordActivity = async (event) => {
  const stored = await AsyncStorage.getItem(ACTIVITY_KEY);
  const list = stored ? JSON.parse(stored) : [];
  const entry = { event, ts: new Date().toISOString() };
  const next = [entry, ...list].slice(0, 25);
  await AsyncStorage.setItem(ACTIVITY_KEY, JSON.stringify(next));
  return next;
};

export const getActivityLog = async () => {
  const stored = await AsyncStorage.getItem(ACTIVITY_KEY);
  return stored ? JSON.parse(stored) : [];
};
