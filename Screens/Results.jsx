import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PrimaryButton from '../components/PrimaryButton';
import { zodiacSigns } from '../data/zodiacData';
import { fetchCompatibilityMessage } from '../api/astroApi';
import theme from '../color/style';

const FAVORITES_KEY = '@astromatch:favorites';

const ResultsScreen = ({ route, navigation }) => {
  const { selectedSign } = route.params || {};
  const [apiMessage, setApiMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState('');

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

  useEffect(() => {
    let isMounted = true;
    const loadMessage = async () => {
      setLoading(true);
      setApiError('');
      try {
        const res = await fetchCompatibilityMessage(selectedSign);
        if (isMounted) setApiMessage(res.message);
      } catch (e) {
        if (isMounted) setApiError('Could not fetch compatibility insight. Showing defaults.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadMessage();
    return () => {
      isMounted = false;
    };
  }, [selectedSign]);

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
      <Text style={[styles.text, { marginTop: theme.spacing.small }]}>
        {loading ? 'Loading live insight...' : apiMessage || apiError}
      </Text>
      {loading && <ActivityIndicator color={theme.colors.primary} style={{ marginTop: 6 }} />}
      {apiError ? <Text style={styles.error}>{apiError}</Text> : null}

      <PrimaryButton title="Add to Favorites" onPress={addToFavorites} />

      <PrimaryButton
        title="View Profile"
        onPress={() =>
          navigation.navigate('MainTabs', {
            screen: 'Profile',
            selectedSign,
          })
        }
      />
      <PrimaryButton
        title="Go to Home"
        onPress={() =>
          navigation.navigate('MainTabs', { screen: 'Home', params: { zodiacSign: selectedSign } })
        }
        style={{ backgroundColor: theme.colors.secondary }}
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
  error: {
    color: theme.colors.error,
    marginTop: 4,
  },
});

export default ResultsScreen;
