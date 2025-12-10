import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator, TouchableOpacity, ScrollView, Animated, Easing, Image } from 'react-native';
import { Card, Avatar, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PrimaryButton from '../components/PrimaryButton';
import { zodiacSigns } from '../data/zodiacData';
import { fetchCompatibilityMessage } from '../api/astroApi';
import theme from '../color/style';
import { mockUsers } from '../data/mockUsers';

const FAVORITES_KEY = '@astromatch:favorites';
const FAVORITE_PROFILES_KEY = '@astromatch:favorite-profiles';

const ResultsScreen = ({ route, navigation }) => {
  const { selectedSign } = route.params || {};
  const [apiMessage, setApiMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState('');
  const [favoriteProfiles, setFavoriteProfiles] = useState([]);
  const tiltAnim = useRef(new Animated.Value(0)).current;

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
    () => mockUsers.filter((p) => compatibleSigns.includes(p.sign)).slice(0, 6),
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
    Animated.loop(
      Animated.sequence([
        Animated.timing(tiltAnim, {
          toValue: 1,
          duration: 2200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(tiltAnim, {
          toValue: 0,
          duration: 2200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    ).start();
    return () => {
      isMounted = false;
    };
  }, [selectedSign, tiltAnim]);

  useEffect(() => {
    const loadFavorites = async () => {
      const stored = await AsyncStorage.getItem(FAVORITE_PROFILES_KEY);
      const parsed = stored ? JSON.parse(stored) : [];
      setFavoriteProfiles(parsed);
    };
    loadFavorites();
  }, []);

  const openProfile = (user) => {
    navigation.navigate('UserProfile', { user });
  };

  const startChat = (user) => {
    navigation.navigate('ChatThread', {
      thread: {
        id: user.id,
        signName: user.name,
        lastMessage: user.threadHistory?.slice(-1)[0]?.text || 'Say hi and break the ice.',
        history:
          user.threadHistory && user.threadHistory.length
            ? user.threadHistory
            : [{ id: `${user.id}-hello`, from: 'them', text: 'Hey there! Ready to vibe?' }],
      },
    });
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
        <Text style={styles.cardTagline}>{item.catchPhrase || item.about}</Text>
        <Text style={styles.cardInsight}>{item.insight || 'High vibes and easy conversation.'}</Text>
        <View style={styles.cardActions}>
          <PrimaryButton
            title="View"
            onPress={() => openProfile(item)}
            style={styles.actionButton}
          />
          <PrimaryButton
            title="Message"
            onPress={() => startChat(item)}
            style={[styles.actionButton, { backgroundColor: theme.colors.secondary }]}
          />
        </View>
      </Card>
    );
  };

  const tiltInterpolation = tiltAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['-6deg', '6deg'],
  });

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>Compatibility results for {selectedSign}</Text>

      <Text style={styles.subHeader}>Compatible Signs:</Text>
      {compatibleSigns.length ? (
        <View style={styles.compatRow}>
          {compatibleSigns.map((sign) => {
            const signData = zodiacSigns.find((s) => s.name === sign);
            return (
              <TouchableOpacity
                key={sign}
                activeOpacity={0.85}
                onPress={() => navigation.navigate('CompatibleUsers', { sign, profile: route.params?.profile })}
              >
                <Animated.View
                  style={[styles.compatCard, { transform: [{ rotate: tiltInterpolation }] }]}
                >
                  {signData?.image ? (
                    <Image source={signData.image} style={styles.compatImage} />
                  ) : null}
                  <Text style={styles.compatName}>{sign}</Text>
                </Animated.View>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : (
        <Text style={styles.text}>No compatibility data available.</Text>
      )}

      <Text style={styles.subHeader}>Insights:</Text>
      <Text style={styles.text}>
        {selectedSignDetails?.description ||
          'Each sign has unique traits that influence compatibility.'}
      </Text>
      <Text style={[styles.text, { marginTop: 4 }]}>
        Element: {selectedSignDetails?.element} • Strengths: {selectedSignDetails?.strengths.join(', ')}
      </Text>
      <Text style={[styles.text, { marginTop: 4 }]}>
        Weaknesses: {selectedSignDetails?.weaknesses.join(', ')}
      </Text>
      <Text style={[styles.text, { marginTop: 4 }]}>Love: {selectedSignDetails?.love}</Text>
      <Text style={[styles.text, { marginTop: 4 }]}>
        Friendship: {selectedSignDetails?.friendship}
      </Text>
      <Text style={[styles.text, { marginTop: 4 }]}>
        Career: {selectedSignDetails?.career}
      </Text>
      <Text style={[styles.text, { marginTop: 4 }]}>
        Mood: {selectedSignDetails?.mood} | Match score: {selectedSignDetails?.compatibility}%
      </Text>
      <Text style={[styles.text, { marginTop: theme.spacing.small }]}>
        {loading ? 'Loading live insight...' : apiMessage || apiError}
      </Text>
      {loading && <ActivityIndicator color={theme.colors.primary} style={{ marginTop: 6 }} />}
      {apiError ? <Text style={styles.error}>{apiError}</Text> : null}

      <Text style={[styles.subHeader, { marginTop: theme.spacing.large }]}>
        People you might vibe with
      </Text>
      <Text style={styles.helperText}>
        Suggested matches based on compatibility. Tap heart to save for later or view to see details.
      </Text>
      {candidateProfiles.length ? (
        <View style={styles.cardsGrid}>
          {candidateProfiles.map((p) => (
            <View key={p.id} style={styles.cardWrapper}>
              {renderProfileCard({ item: p })}
            </View>
          ))}
        </View>
      ) : (
        <Text style={styles.text}>No suggested profiles for these signs yet.</Text>
      )}

      <PrimaryButton
        title="View Profile"
        onPress={() =>
          navigation.navigate('MainTabs', {
            screen: 'Profile',
            params: { selectedSign, profile: route.params?.profile || {} },
          })
        }
      />
      <PrimaryButton
        title="Start using the app"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'MainTabs',
                params: {
                  screen: 'Home',
                  params: {
                    zodiacSign: selectedSign,
                    profile: route.params?.profile || {},
                  },
                },
              },
            ],
          })
        }
        style={{ backgroundColor: theme.colors.secondary, marginTop: theme.spacing.small }}
      />
    </ScrollView>
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
  helperText: {
    ...theme.textStyles.subtitle,
    marginBottom: theme.spacing.small,
  },
  cardsGrid: {
    flexDirection: 'column',
    gap: theme.spacing.medium,
    marginTop: theme.spacing.small,
  },
  compatRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.small,
    marginTop: theme.spacing.small,
  },
  compatCard: {
    width: 110,
    height: 110,
    borderRadius: 16,
    backgroundColor: theme.colors.cardBackground,
    borderColor: theme.colors.borderColor,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    ...theme.shadows.light,
  },
  compatImage: {
    width: 52,
    height: 52,
    marginBottom: 6,
    resizeMode: 'contain',
  },
  compatName: {
    ...theme.textStyles.subtitle,
    textAlign: 'center',
  },
  cardWrapper: {
    width: '100%',
  },
  card: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.medium,
    borderColor: theme.colors.borderColor,
    width: '100%',
    ...theme.shadows.light,
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
