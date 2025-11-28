import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PrimaryButton from '../components/PrimaryButton';
import { zodiacSigns } from '../data/zodiacData';
import theme from '../color/style';

const FAVORITES_KEY = '@astromatch:favorites';

const ResultsScreen = ({ route, navigation }) => {
  const { selectedSign } = route.params || {};

  if (!selectedSign) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>No sign selected</Text>
        <Text style={styles.text}>
          Please go back and choose a zodiac sign before viewing compatibility results.
        </Text>
        <PrimaryButton title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  const selectedSignDetails = zodiacSigns.find(
    (sign) => sign.name === selectedSign
  );
  const compatibleSigns = selectedSignDetails?.compatibleSigns || [];

  const addToFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      const existing = stored ? JSON.parse(stored) : [];
      if (!existing.includes(selectedSign)) {
        const updated = [...existing, selectedSign];
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      }
      Alert.alert('Saved', `${selectedSign} added to your favorites.`);
    } catch (e) {
      console.log(e);
      Alert.alert('Error', 'Could not save favorite. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Compatibility results for {selectedSign}</Text>

      <Text style={styles.subHeader}>Compatible Signs:</Text>
      {compatibleSigns.length ? (
        compatibleSigns.map((sign, index) => (
          <Text key={index} style={styles.text}>
            {sign}
          </Text>
        ))
      ) : (
        <Text style={styles.text}>No compatibility data available.</Text>
      )}

      <Text style={styles.subHeader}>Insights:</Text>
      <Text style={styles.text}>
        {selectedSignDetails?.description ||
          'Each sign has unique traits that influence compatibility.'}
      </Text>

      <PrimaryButton title="Add to Favorites" onPress={addToFavorites} />

      <PrimaryButton
        title="View Profile"
        onPress={() =>
          navigation.navigate('Profile', {
            selectedSign,
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.large,
    backgroundColor: theme.colors.background,
  },
  header: {
    ...theme.textStyles.header,
    marginBottom: theme.spacing.medium,
  },
  subHeader: {
    ...theme.textStyles.body,
    fontWeight: 'bold',
    marginTop: theme.spacing.medium,
  },
  text: {
    ...theme.textStyles.body,
    marginTop: 4,
  },
});

export default ResultsScreen;
