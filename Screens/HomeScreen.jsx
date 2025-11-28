import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import theme from '../color/style';

const HomeScreen = ({ route, navigation }) => {
  const { name = 'Guest', zodiacSign = 'Your Sign' } = route?.params || {};

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <Image source={require('../vectors/logo.png')} style={styles.avatar} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.signLabel}>{zodiacSign}</Text>
        <Text style={styles.subtitle}>Welcome to your Astro world ✨</Text>
      </View>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => navigation.navigate('ZodiacSign')}
      >
        <Text style={styles.actionText}>Find Compatible Signs</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => navigation.navigate('Favorites')}
      >
        <Text style={styles.actionText}>Favorites</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => navigation.navigate('Messages')}
      >
        <Text style={styles.actionText}>Messages</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.link}
        onPress={() => navigation.navigate('Profile')}
      >
        <Text style={styles.linkText}>View Profile →</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.large,
    alignItems: 'center',
  },
  profileCard: {
    alignItems: 'center',
    marginBottom: theme.spacing.large,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: theme.spacing.small,
  },
  name: {
    ...theme.textStyles.header,
  },
  signLabel: {
    ...theme.textStyles.subtitle,
    marginTop: 4,
  },
  subtitle: {
    ...theme.textStyles.body,
    marginTop: 8,
    textAlign: 'center',
  },
  actionButton: {
    width: '100%',
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    borderRadius: theme.borderRadius.medium,
    alignItems: 'center',
    marginBottom: theme.spacing.small,
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
  },
  link: {
    marginTop: theme.spacing.medium,
  },
  linkText: {
    color: theme.colors.text,
    textDecorationLine: 'underline',
  },
});
