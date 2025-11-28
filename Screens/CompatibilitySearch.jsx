import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import theme from '../color/style';

// CompatibilitySearchScreen component: Displays compatibility information for the selected zodiac sign
const CompatibilitySearchScreen = ({ route, navigation }) => {
  const { selectedSign } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {selectedSign
          ? `Searching compatibility for ${selectedSign}`
          : 'Choose a sign to explore compatibility'}
      </Text>

      <Text style={styles.text}>
        We’ll show matches based on zodiac compatibility and your profile details.
      </Text>

      <PrimaryButton
        title="See Results"
        onPress={() =>
          navigation.navigate('Results', {
            selectedSign,
          })
        }
        disabled={!selectedSign}
      />
    </View>
  );
};

// Styles for the CompatibilitySearchScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.large,
    backgroundColor: theme.colors.background,
  },
  header: {
    ...theme.textStyles.header,
    textAlign: 'center',
    marginBottom: theme.spacing.medium,
  },
  text: {
    ...theme.textStyles.body,
    textAlign: 'center',
    marginBottom: theme.spacing.large,
  },
});

export default CompatibilitySearchScreen;
