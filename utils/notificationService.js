import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { Alert, Platform } from 'react-native';

const PREFS_KEY = '@astromatch:notif-prefs';
const SCHEDULE_KEY = '@astromatch:notif-schedule';

export const defaultPrefs = {
  dailyHoroscope: false,
  matchAlerts: false,
  messageAlerts: false,
};

export const getPreferences = async () => {
  const stored = await AsyncStorage.getItem(PREFS_KEY);
  return stored ? JSON.parse(stored) : defaultPrefs;
};

export const savePreferences = async (prefs) => {
  await AsyncStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
};

const ensurePermissions = async () => {
  const settings = await Notifications.getPermissionsAsync();
  if (settings?.granted) return true;
  const req = await Notifications.requestPermissionsAsync();
  if (!req.granted) {
    Alert.alert('Notifications blocked', 'Enable notifications in settings to get horoscope and match alerts.');
    return false;
  }
  return true;
};

const getScheduled = async () => {
  const stored = await AsyncStorage.getItem(SCHEDULE_KEY);
  return stored ? JSON.parse(stored) : {};
};

const saveScheduled = async (obj) => AsyncStorage.setItem(SCHEDULE_KEY, JSON.stringify(obj));

export const cancelDailyHoroscope = async () => {
  const scheduled = await getScheduled();
  if (scheduled.dailyHoroscopeId) {
    await Notifications.cancelScheduledNotificationAsync(scheduled.dailyHoroscopeId);
    delete scheduled.dailyHoroscopeId;
    await saveScheduled(scheduled);
  }
};

export const scheduleDailyHoroscope = async () => {
  const allowed = await ensurePermissions();
  if (!allowed) return null;
  const scheduled = await getScheduled();
  if (scheduled.dailyHoroscopeId) {
    await Notifications.cancelScheduledNotificationAsync(scheduled.dailyHoroscopeId);
  }
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('daily', {
      name: 'Daily',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }
  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Your daily horoscope',
      body: 'See today’s energy and lucky picks.',
    },
    trigger: {
      hour: 9,
      minute: 0,
      repeats: true,
      channelId: Platform.OS === 'android' ? 'daily' : undefined,
    },
  });
  scheduled.dailyHoroscopeId = id;
  await saveScheduled(scheduled);
  return id;
};

export const triggerMatchAlert = async () => {
  const allowed = await ensurePermissions();
  if (!allowed) return null;
  return Notifications.scheduleNotificationAsync({
    content: {
      title: 'New match alert',
      body: 'A new compatible match is waiting. Check it out!',
    },
    trigger: null,
  });
};

export const triggerMessageAlert = async () => {
  const allowed = await ensurePermissions();
  if (!allowed) return null;
  return Notifications.scheduleNotificationAsync({
    content: {
      title: 'New message',
      body: 'You have a new message. Open Messages to reply.',
    },
    trigger: null,
  });
};

export const hydrateNotifications = async () => {
  const prefs = await getPreferences();
  if (prefs.dailyHoroscope) {
    await scheduleDailyHoroscope();
  }
};
