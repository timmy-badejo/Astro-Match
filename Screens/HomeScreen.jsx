import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Avatar, ListItem, Icon } from 'react-native-elements';
import PrimaryButton from '../components/PrimaryButton';
import { zodiacSigns } from '../data/zodiacData';
import theme from '../color/style';

const HomeScreen = ({ route, navigation }) => {
  const { name = 'Guest', zodiacSign = 'Your Sign' } = route?.params || {};

  const dailyTip = useMemo(() => {
    const tips = [
      'Send a kind message to someone you matched with yesterday.',
      'Check the moon phase to plan your next meetup.',
      'Lead with curiosity—ask about a hobby in their profile.',
      'Share a cosmic fun fact to break the ice.',
    ];
    const idx = new Date().getDate() % tips.length;
    return tips[idx];
  }, []);

  const previewMatches = useMemo(() => zodiacSigns.slice(0, 3), []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card containerStyle={styles.heroCard}>
        <View style={styles.heroHeader}>
          <Avatar
            rounded
            size="medium"
            source={require('../vectors/logo.png')}
            containerStyle={{ marginRight: theme.spacing.medium }}
          />
          <View>
            <Text style={styles.heroTitle}>Welcome, {name}</Text>
            <Text style={styles.heroSubtitle}>Sign: {zodiacSign}</Text>
          </View>
        </View>
        <PrimaryButton
          title="Find compatibility"
          onPress={() => navigation.navigate('ZodiacSign')}
        />
      </Card>

      <Card containerStyle={styles.card}>
        <Card.Title style={styles.cardTitle}>Daily cosmic tip</Card.Title>
        <Text style={styles.body}>{dailyTip}</Text>
      </Card>

      <Card containerStyle={styles.card}>
        <Card.Title style={styles.cardTitle}>Top matches preview</Card.Title>
        {previewMatches.map((sign) => (
          <ListItem
            key={sign.id}
            bottomDivider
            containerStyle={styles.listItem}
            onPress={() => navigation.navigate('Results', { selectedSign: sign.name })}
          >
            <Avatar source={sign.image} rounded />
            <ListItem.Content>
              <ListItem.Title style={styles.listTitle}>{sign.name}</ListItem.Title>
              <ListItem.Subtitle style={styles.listSubtitle}>{sign.traits.join(' • ')}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron color={theme.colors.highlight} />
          </ListItem>
        ))}
      </Card>

      <Card containerStyle={styles.card}>
        <Card.Title style={styles.cardTitle}>Quick actions</Card.Title>
        <View style={styles.actionsRow}>
          <PrimaryButton
            title="Favorites"
            onPress={() => navigation.navigate('MainTabs', { screen: 'Favorites' })}
            style={styles.smallButton}
          />
          <PrimaryButton
            title="Messages"
            onPress={() => navigation.navigate('MainTabs', { screen: 'Messages' })}
            style={styles.smallButton}
          />
          <PrimaryButton
            title="Settings"
            onPress={() => navigation.navigate('MainTabs', { screen: 'Settings' })}
            style={styles.smallButton}
          />
        </View>
      </Card>

      <ListItem
        bottomDivider
        containerStyle={styles.linkItem}
        onPress={() =>
          navigation.navigate('MainTabs', {
            screen: 'Profile',
            params: { name, selectedSign: zodiacSign },
          })
        }
      >
        <Icon name="user" type="feather" color={theme.colors.text} />
        <ListItem.Content>
          <ListItem.Title style={styles.listTitle}>View full profile</ListItem.Title>
          <ListItem.Subtitle style={styles.listSubtitle}>Update your details</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron color={theme.colors.highlight} />
      </ListItem>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.large,
    backgroundColor: theme.colors.background,
  },
  heroCard: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.large,
    borderColor: theme.colors.borderColor,
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.medium,
  },
  heroTitle: {
    ...theme.textStyles.header,
  },
  heroSubtitle: {
    ...theme.textStyles.subtitle,
  },
  card: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.medium,
    borderColor: theme.colors.borderColor,
  },
  cardTitle: {
    ...theme.textStyles.subtitle,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  body: {
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
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.small,
  },
  smallButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  linkItem: {
    backgroundColor: theme.colors.cardBackground,
    marginTop: theme.spacing.medium,
    borderRadius: theme.borderRadius.medium,
  },
});
