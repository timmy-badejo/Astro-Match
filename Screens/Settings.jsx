import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Card, ListItem, CheckBox, Icon } from 'react-native-elements';
import theme from '../color/style';

const SettingsScreen = () => {
  const [notifications, setNotifications] = useState(true);
  const [tips, setTips] = useState(true);

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
        <Card.Title style={styles.title}>Preferences</Card.Title>
        <ListItem bottomDivider containerStyle={styles.listItem}>
          <Icon name="bell" type="feather" color={theme.colors.highlight} />
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
          <Icon name="star" type="feather" color={theme.colors.highlight} />
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
      </Card>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.medium,
  },
  card: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.medium,
    borderColor: theme.colors.borderColor,
  },
  title: {
    ...theme.textStyles.subtitle,
    textTransform: 'uppercase',
  },
  text: {
    ...theme.textStyles.body,
    marginBottom: theme.spacing.small,
  },
  listItem: {
    backgroundColor: 'transparent',
  },
  listTitle: {
    ...theme.textStyles.body,
    fontWeight: 'bold',
  },
  listSubtitle: {
    ...theme.textStyles.subtitle,
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
});
