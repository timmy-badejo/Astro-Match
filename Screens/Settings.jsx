import React, { useState, useMemo, useEffect } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Card, ListItem, CheckBox, Icon, ButtonGroup, Switch } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppTheme } from '../context/ThemeContext';
import PrimaryButton from '../components/PrimaryButton';
import {
  defaultPrefs,
  getPreferences,
  savePreferences,
  scheduleDailyHoroscope,
  cancelDailyHoroscope,
  triggerMatchAlert,
  triggerMessageAlert,
  hydrateNotifications,
} from '../utils/notificationService';
import { getPremiumStatus, setPremiumStatus } from '../utils/premiumService';

const SettingsScreen = () => {
  const { theme: currentTheme, mode, setMode } = useAppTheme();
  const [notifPrefs, setNotifPrefs] = useState(defaultPrefs);
  const [tips, setTips] = useState(true);
  const [premium, setPremium] = useState(false);
  const styles = useMemo(() => createStyles(currentTheme), [currentTheme]);

  const resetData = async () => {
    await AsyncStorage.clear();
  };

  useEffect(() => {
    const load = async () => {
      const prefs = await getPreferences();
      setNotifPrefs(prefs);
      await hydrateNotifications();
      const prem = await getPremiumStatus();
      setPremium(!!prem.active);
    };
    load();
  }, []);

  const updatePref = async (key, value) => {
    const next = { ...notifPrefs, [key]: value };
    setNotifPrefs(next);
    await savePreferences(next);
  };

  const toggleDailyHoroscope = async () => {
    const next = !notifPrefs.dailyHoroscope;
    await updatePref('dailyHoroscope', next);
    if (next) {
      await scheduleDailyHoroscope();
    } else {
      await cancelDailyHoroscope();
    }
  };

  const toggleMatch = async () => {
    const next = !notifPrefs.matchAlerts;
    await updatePref('matchAlerts', next);
    if (next) await triggerMatchAlert();
  };

  const toggleMessage = async () => {
    const next = !notifPrefs.messageAlerts;
    await updatePref('messageAlerts', next);
    if (next) await triggerMessageAlert();
  };

  const upgrade = async () => {
    const updated = await setPremiumStatus(true);
    setPremium(updated.active);
  };

  const downgrade = async () => {
    const updated = await setPremiumStatus(false);
    setPremium(updated.active);
  };

  const themeButtons = ['System', 'Light', 'Dark'];
  const selectedIndex = themeButtons.findIndex((b) => b.toLowerCase() === mode);

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
        <Card.Title style={styles.title}>Help & onboarding</Card.Title>
        <Text style={styles.text}>
          New here? Start by creating your profile, then pick your sign to see compatibility
          insights. Save favorites to revisit and message when you are ready.
        </Text>
        <Text style={styles.text}>
          Safety tip: keep chats respectful and avoid sharing personal info until you trust
          your match.
        </Text>
      </Card>

      <Card containerStyle={styles.card}>
        <Card.Title style={styles.title}>Theme</Card.Title>
        <ButtonGroup
          onPress={(i) => setMode(themeButtons[i].toLowerCase())}
          selectedIndex={selectedIndex}
          buttons={themeButtons}
          containerStyle={styles.buttonGroup}
          textStyle={{ color: currentTheme.colors.text }}
          selectedButtonStyle={{ backgroundColor: currentTheme.colors.primary }}
        />
      </Card>

      <Card containerStyle={styles.card}>
        <Card.Title style={styles.title}>Preferences</Card.Title>
        <ListItem bottomDivider containerStyle={styles.listItem}>
          <Icon name="sunrise" type="feather" color={currentTheme.colors.highlight} />
          <ListItem.Content>
            <ListItem.Title style={styles.listTitle}>Daily horoscope</ListItem.Title>
            <ListItem.Subtitle style={styles.listSubtitle}>
              Get a notification each morning at 9:00.
            </ListItem.Subtitle>
          </ListItem.Content>
          <Switch value={notifPrefs.dailyHoroscope} onValueChange={toggleDailyHoroscope} />
        </ListItem>

        <ListItem bottomDivider containerStyle={styles.listItem}>
          <Icon name="bell" type="feather" color={currentTheme.colors.highlight} />
          <ListItem.Content>
            <ListItem.Title style={styles.listTitle}>New match alerts</ListItem.Title>
            <ListItem.Subtitle style={styles.listSubtitle}>
              Be notified when a compatible match appears.
            </ListItem.Subtitle>
          </ListItem.Content>
          <Switch value={notifPrefs.matchAlerts} onValueChange={toggleMatch} />
        </ListItem>

        <ListItem containerStyle={styles.listItem}>
          <Icon name="message-circle" type="feather" color={currentTheme.colors.highlight} />
          <ListItem.Content>
            <ListItem.Title style={styles.listTitle}>Message notifications</ListItem.Title>
            <ListItem.Subtitle style={styles.listSubtitle}>
              Get a ping when new messages arrive.
            </ListItem.Subtitle>
          </ListItem.Content>
          <Switch value={notifPrefs.messageAlerts} onValueChange={toggleMessage} />
        </ListItem>

        <ListItem containerStyle={styles.listItem} onPress={resetData}>
          <Icon name="trash-2" type="feather" color={currentTheme.colors.error} />
          <ListItem.Content>
            <ListItem.Title style={[styles.listTitle, { color: currentTheme.colors.error }]}>
              Clear local data / reset onboarding
            </ListItem.Title>
            <ListItem.Subtitle style={styles.listSubtitle}>
              Removes stored profile, favorites, and theme preference.
            </ListItem.Subtitle>
          </ListItem.Content>
          <Icon name="chevron-right" type="feather" color={currentTheme.colors.highlight} />
        </ListItem>
      </Card>

      <Card containerStyle={styles.card}>
        <Card.Title style={styles.title}>Premium</Card.Title>
        <Text style={styles.text}>
          Unlock detailed compatibility reports, unlimited favorites, advanced filters, and an ad-free experience.
        </Text>
        <ListItem containerStyle={styles.listItem}>
          <Icon name="star" type="feather" color={currentTheme.colors.highlight} />
          <ListItem.Content>
            <ListItem.Title style={styles.listTitle}>Status: {premium ? 'Active' : 'Free'}</ListItem.Title>
            <ListItem.Subtitle style={styles.listSubtitle}>
              {premium ? 'Thank you for supporting Astro-Match!' : 'Upgrade to enjoy all premium perks.'}
            </ListItem.Subtitle>
          </ListItem.Content>
          <PrimaryButton
            title={premium ? 'Downgrade' : 'Upgrade'}
            onPress={premium ? downgrade : upgrade}
            style={{ marginLeft: 8 }}
          />
        </ListItem>
      </Card>
    </View>
  );
};

export default SettingsScreen;

const createStyles = (th) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: th.colors.background,
      padding: th.spacing.medium,
    },
    card: {
      backgroundColor: th.colors.cardBackground,
      borderRadius: th.borderRadius.medium,
      borderColor: th.colors.borderColor,
    },
    title: {
      ...th.textStyles.subtitle,
      textTransform: 'uppercase',
    },
    text: {
      ...th.textStyles.body,
      marginBottom: th.spacing.small,
    },
    listItem: {
      backgroundColor: 'transparent',
    },
    listTitle: {
      ...th.textStyles.body,
      fontWeight: 'bold',
    },
    listSubtitle: {
      ...th.textStyles.subtitle,
    },
    buttonGroup: {
      borderColor: th.colors.borderColor,
    },
  });
