import React, { useMemo, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import OnboardingSlide from '../components/OnboardingSlide';
import PrimaryButton from '../components/PrimaryButton';
import theme from '../color/style';

const slides = [
  {
    title: 'Welcome to AstroMatch',
    subtitle: 'Create your cosmic profile and see how the stars align for your relationships.',
  },
  {
    title: 'Discover compatibility',
    subtitle: 'Search by sign, view tailored insights, and save your favorite matches.',
  },
  {
    title: 'Stay safe & guided',
    subtitle: 'Control notifications, review tips, and get a daily cosmic nudge to start conversations.',
  },
];

const OnboardingScreen = ({ navigation }) => {
  const [current, setCurrent] = useState(0);
  const isLast = useMemo(() => current === slides.length - 1, [current]);

  const handleNext = () => {
    if (isLast) {
      navigation.replace('CreateProfile');
    } else {
      setCurrent((c) => c + 1);
    }
  };

  const handleSkip = () => navigation.replace('SignIn');

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skip} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <OnboardingSlide
        title={slides[current].title}
        subtitle={slides[current].subtitle}
      />

      <View style={styles.progress}>
        {slides.map((_, idx) => (
          <View
            key={idx}
            style={[styles.dot, current === idx && styles.dotActive]}
          />
        ))}
      </View>

      <PrimaryButton
        title={isLast ? "Let's go" : 'Next'}
        onPress={handleNext}
      />
      <PrimaryButton
        title="I already have a profile"
        onPress={handleSkip}
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
  skip: {
    position: 'absolute',
    right: theme.spacing.large,
    top: theme.spacing.large,
    padding: theme.spacing.small,
  },
  skipText: {
    ...theme.textStyles.subtitle,
    color: '#fff',
    textDecorationLine: 'underline',
  },
  progress: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: theme.spacing.medium,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#334169',
    marginHorizontal: 6,
  },
  dotActive: {
    backgroundColor: theme.colors.primary,
    width: 18,
  },
});
