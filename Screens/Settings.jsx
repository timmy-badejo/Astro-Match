import React, { useState, useMemo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Card, ListItem, CheckBox, Icon, ButtonGroup } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppTheme } from '../context/ThemeContext';

const SettingsScreen = () => {
  const { theme: currentTheme, mode, setMode } = useAppTheme();
  const [notifications, setNotifications] = useState(true);
  const [tips, setTips] = useState(true);
  const styles = useMemo(() => createStyles(currentTheme), [currentTheme]);

  const resetData = async () => {
    await AsyncStorage.clear();
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
          <Icon name="bell" type="feather" color={currentTheme.colors.highlight} />
          <ListItem.Content>
            <ListItem.Title style={styles.listTitle}>Push notifications</ListItem.Title>
            <ListItem.Subtitle style={styles.listSubtitle}>
              Get alerts when compatibility updates or new messages arrive.
            </ListItem.Subtitle>
          </ListItem.Content>
          <CheckBox
            checked={notifications}
            onPress={() => setNotifications((v) => !v)}
            containerStyle={styles.checkbox}
          />
        </ListItem>

        <ListItem containerStyle={styles.listItem}>
          <Icon name="star" type="feather" color={currentTheme.colors.highlight} />
          <ListItem.Content>
            <ListItem.Title style={styles.listTitle}>Daily cosmic tips</ListItem.Title>
            <ListItem.Subtitle style={styles.listSubtitle}>
              Show a daily nudge on the home screen to spark conversations.
            </ListItem.Subtitle>
          </ListItem.Content>
          <CheckBox
            checked={tips}
            onPress={() => setTips((v) => !v)}
            containerStyle={styles.checkbox}
          />
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
    checkbox: {
      backgroundColor: 'transparent',
      borderWidth: 0,
    },
    buttonGroup: {
      borderColor: th.colors.borderColor,
    },
  });
