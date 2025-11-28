import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import theme from '../color/style';

const SplashScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../vectors/logo.png')} style={styles.logo} />
      <Text style={styles.tagline}>Align your heart with the stars.</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace('Onboarding')}
      >
        <Text style={styles.buttonText}>Let&apos;s get started →</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.large,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: theme.spacing.large,
    resizeMode: 'contain',
  },
  tagline: {
    ...theme.textStyles.subtitle,
    textAlign: 'center',
    marginBottom: theme.spacing.large,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.large,
    paddingVertical: theme.spacing.small,
    borderRadius: theme.borderRadius.medium,
  },
  buttonText: {
    ...theme.textStyles.button,
    color: '#fff',
  },
});
