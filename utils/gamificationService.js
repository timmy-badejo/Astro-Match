import AsyncStorage from '@react-native-async-storage/async-storage';

const STREAK_KEY = '@astromatch:streak';
const QUIZ_KEY = '@astromatch:quiz-best';
const FAVORITES_KEY = '@astromatch:favorite-profiles';

const todayString = () => new Date().toISOString().slice(0, 10); // yyyy-mm-dd

const isYesterday = (dateStr) => {
  const prev = new Date(dateStr);
  const now = new Date();
  const diff = now - prev;
  return diff > 0 && diff <= 1000 * 60 * 60 * 24 * 1.5; // within ~1.5 days
};

export const getStreak = async () => {
  const stored = await AsyncStorage.getItem(STREAK_KEY);
  return stored ? JSON.parse(stored) : { count: 0, lastCheck: null };
};

export const checkInToday = async () => {
  const current = await getStreak();
  const today = todayString();
  if (current.lastCheck === today) {
    return { ...current, alreadyChecked: true };
  }
  const nextCount = current.lastCheck && isYesterday(current.lastCheck) ? current.count + 1 : 1;
  const updated = { count: nextCount, lastCheck: today };
  await AsyncStorage.setItem(STREAK_KEY, JSON.stringify(updated));
  return { ...updated, alreadyChecked: false };
};

export const getQuizBest = async () => {
  const stored = await AsyncStorage.getItem(QUIZ_KEY);
  return stored ? Number(stored) : 0;
};

export const saveQuizScore = async (score) => {
  const best = await getQuizBest();
  const next = Math.max(best, score);
  await AsyncStorage.setItem(QUIZ_KEY, String(next));
  return next;
};

export const getFavoritesCount = async () => {
  const stored = await AsyncStorage.getItem(FAVORITES_KEY);
  const list = stored ? JSON.parse(stored) : [];
  return Array.isArray(list) ? list.length : 0;
};

export const computeBadges = ({ streak = 0, quizBest = 0, favoritesCount = 0 }) => {
  const badges = [];
  if (streak >= 1) badges.push({ id: 'streak-1', label: 'First Steps', desc: 'Checked in today.' });
  if (streak >= 3) badges.push({ id: 'streak-3', label: '3-Day Spark', desc: '3-day check-in streak.' });
  if (streak >= 7) badges.push({ id: 'streak-7', label: 'Streak Star', desc: '7+ days in a row.' });
  if (quizBest >= 4) badges.push({ id: 'quiz-ace', label: 'Quiz Whiz', desc: 'Scored 4+ on the quiz.' });
  if (favoritesCount >= 5) badges.push({ id: 'connector', label: 'Connector', desc: 'Favorited 5+ profiles.' });
  if (favoritesCount >= 10) badges.push({ id: 'super-connector', label: 'Super Connector', desc: 'Favorited 10+ profiles.' });
  if (!badges.length) badges.push({ id: 'getting-started', label: 'Getting Started', desc: 'Begin your journey to earn badges.' });
  return badges;
};
