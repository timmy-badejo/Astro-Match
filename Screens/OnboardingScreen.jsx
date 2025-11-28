import React from 'react';
import { View, StyleSheet } from 'react-native';
import OnboardingSlide from '../components/OnboardingSlide';
import PrimaryButton from '../components/PrimaryButton';
import theme from '../color/style';

const OnboardingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <OnboardingSlide
        title="Welcome to AstroMatch"
        subtitle="Create your profile, discover your star sign matches, and start meaningful conversations."
      />
      <PrimaryButton
        title="Create Profile"
        onPress={() => navigation.navigate('CreateProfile')}
      />
      <PrimaryButton
        title="I already have a profile"
        onPress={() => navigation.navigate('SignIn')}
        style={{ backgroundColor: theme.colors.secondary }}
      />
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.large,
    justifyContent: 'center',
    backgroundColor: '#060B3A',
  },
});
