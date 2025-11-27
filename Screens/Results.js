import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { zodiacSigns } from '../data/zodiacData';
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
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }
  const selectedSignDetails = zodiacSigns.find((sign) => sign.name === selectedSign);
  const compatibleSigns = selectedSignDetails ? selectedSignDetails.compatibleSigns : [];

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
      <Text style={styles.header}>Compatibility Results for {selectedSign}</Text>

      <Text style={styles.subHeader}>Compatible Signs:</Text>
      {compatibleSigns.length > 0 ? (
        compatibleSigns.map((sign, index) => (
          <Text key={index} style={styles.text}>{sign}</Text>
        ))
      ) : (
        <Text style={styles.text}>No compatibility data available.</Text>
      )}

      <Text style={styles.subHeader}>Compatibility Insights:</Text>
      <Text style={styles.text}>
        {selectedSignDetails?.description ||
          'Each sign has unique compatibility traits.'}
      </Text>

      <Button title="Add to Favorites" onPress={addToFavorites} />

      <View style={{ height: 12 }} />

      <Button
        title="View Profile"
        onPress={() => navigation.navigate('Profile', { selectedSign })}
      />
    </View>
  );
};

export default ResultsScreen;