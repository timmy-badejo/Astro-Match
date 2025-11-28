import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import theme from '../color/style';

const OnboardingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to AstroMatch</Text>

      <View style={styles.card}>
        <Text style={styles.stepTitle}>1. Create your profile</Text>
        <Text style={styles.stepText}>Tell us who you are and what you want.</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.stepTitle}>2. Discover your zodiac</Text>
        <Text style={styles.stepText}>We align you with your star sign automatically.</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.stepTitle}>3. Explore compatibility</Text>
        <Text style={styles.stepText}>Find aligned signs, save favorites, and message.</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace('ProfileSetup')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.large,
    justifyContent: 'center',
  },
  title: {
    ...theme.textStyles.header,
    textAlign: 'center',
    marginBottom: theme.spacing.large,
  },
  card: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.medium,
    marginBottom: theme.spacing.medium,
    ...theme.shadows.light,
  },
  stepTitle: {
    ...theme.textStyles.body,
    fontWeight: '700',
    marginBottom: 4,
  },
  stepText: {
    ...theme.textStyles.subtitle,
  },
  button: {
    marginTop: theme.spacing.large,
    alignSelf: 'center',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.xlarge,
    paddingVertical: theme.spacing.small,
    borderRadius: theme.borderRadius.medium,
  },
  buttonText: {
    ...theme.textStyles.button,
    color: '#fff',
  },
});
