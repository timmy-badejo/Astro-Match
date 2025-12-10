import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { Card, Avatar, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PrimaryButton from '../components/PrimaryButton';
import { zodiacSigns } from '../data/zodiacData';
import { fetchCompatibilityMessage } from '../api/astroApi';
import theme from '../color/style';

const FAVORITES_KEY = '@astromatch:favorites';
const FAVORITE_PROFILES_KEY = '@astromatch:favorite-profiles';

const MOCK_PROFILES = [
  {
    id: 'p1',
    name: 'Nova',
    sign: 'Leo',
    catchPhrase: 'Chasing sunrises and good energy.',
    insight: 'Bold conversationalist who thrives on playful banter.',
    image: require('../vectors/profileimage.jpg'),
  },
  {
    id: 'p2',
    name: 'Orion',
    sign: 'Sagittarius',
    catchPhrase: 'Let’s swap travel stories over coffee.',
    insight: 'Adventurous and honest, loves spontaneous plans.',
    image: require('../vectors/leo.png'),
  },
  {
    id: 'p3',
    name: 'Luna',
    sign: 'Aquarius',
    catchPhrase: 'Building the future one idea at a time.',
    insight: 'Thoughtful, curious, and big on meaningful chats.',
    image: require('../vectors/aquarius.png'),
  },
  {
    id: 'p4',
    name: 'Kai',
    sign: 'Gemini',
    catchPhrase: 'Two sides, both ready for adventure.',
    insight: 'Great listener with a witty sense of humor.',
    image: require('../vectors/gemini.png'),
  },
];

const ResultsScreen = ({ route, navigation }) => {
  const { selectedSign } = route.params || {};
  const [apiMessage, setApiMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState('');
  const [favoriteProfiles, setFavoriteProfiles] = useState([]);

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
  const candidateProfiles = useMemo(
    () => MOCK_PROFILES.filter((p) => compatibleSigns.includes(p.sign)),
    [compatibleSigns],
  );

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

  useEffect(() => {
    const loadFavorites = async () => {
      const stored = await AsyncStorage.getItem(FAVORITE_PROFILES_KEY);
      const parsed = stored ? JSON.parse(stored) : [];
      setFavoriteProfiles(parsed);
    };
    loadFavorites();
  }, []);

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

  const toggleProfileFavorite = async (profileId) => {
    const updated = favoriteProfiles.includes(profileId)
      ? favoriteProfiles.filter((id) => id !== profileId)
      : [...favoriteProfiles, profileId];
    setFavoriteProfiles(updated);
    await AsyncStorage.setItem(FAVORITE_PROFILES_KEY, JSON.stringify(updated));
  };

  const renderProfileCard = ({ item }) => {
    const isFav = favoriteProfiles.includes(item.id);
    return (
      <Card containerStyle={styles.card}>
        <View style={styles.cardHeader}>
          <Avatar rounded source={item.image} size="medium" />
          <View style={{ flex: 1, marginLeft: theme.spacing.small }}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardSubtitle}>{item.sign}</Text>
          </View>
          <TouchableOpacity onPress={() => toggleProfileFavorite(item.id)}>
            <Icon
              name={isFav ? 'heart' : 'heart-o'}
              type="font-awesome"
              color={isFav ? theme.colors.highlight : theme.colors.text}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.cardTagline}>{item.catchPhrase}</Text>
        <Text style={styles.cardInsight}>{item.insight}</Text>
        <View style={styles.cardActions}>
          <PrimaryButton
            title="View"
            onPress={() =>
              navigation.navigate('MainTabs', {
                screen: 'Profile',
                params: { name: item.name, selectedSign: item.sign },
              })
            }
            style={styles.actionButton}
          />
          <PrimaryButton
            title="Message"
            onPress={() =>
              navigation.navigate('MainTabs', { screen: 'Messages', params: { signName: item.name } })
            }
            style={[styles.actionButton, { backgroundColor: theme.colors.secondary }]}
          />
        </View>
      </Card>
    );
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

      <Text style={[styles.subHeader, { marginTop: theme.spacing.large }]}>
        People you might vibe with
      </Text>
      {candidateProfiles.length ? (
        <FlatList
          data={candidateProfiles}
          keyExtractor={(item) => item.id}
          renderItem={renderProfileCard}
          contentContainerStyle={{ paddingVertical: theme.spacing.small }}
        />
      ) : (
        <Text style={styles.text}>No suggested profiles for these signs yet.</Text>
      )}

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
  card: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.medium,
    borderColor: theme.colors.borderColor,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.small,
  },
  cardTitle: {
    ...theme.textStyles.body,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    ...theme.textStyles.subtitle,
  },
  cardTagline: {
    ...theme.textStyles.body,
    marginBottom: 4,
  },
  cardInsight: {
    ...theme.textStyles.subtitle,
    marginBottom: theme.spacing.small,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.small,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
});

export default ResultsScreen;
