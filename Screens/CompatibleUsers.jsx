import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Card, Avatar, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mockUsers } from '../data/mockUsers';
import theme from '../color/style';
import { getPremiumStatus, FREE_FAVORITE_LIMIT } from '../utils/premiumService';

const FAVORITE_PROFILES_KEY = '@astromatch:favorite-profiles';

const CompatibleUsers = ({ route, navigation }) => {
  const { sign } = route.params || {};
  const [favorites, setFavorites] = useState([]);
  const [premium, setPremium] = useState(false);

  const filtered = useMemo(
    () => mockUsers.filter((u) => u.sign === sign),
    [sign],
  );

  useEffect(() => {
    const load = async () => {
      const stored = await AsyncStorage.getItem(FAVORITE_PROFILES_KEY);
      setFavorites(stored ? JSON.parse(stored) : []);
      const prem = await getPremiumStatus();
      setPremium(!!prem.active);
    };
    load();
  }, []);

  const toggleFavorite = async (id) => {
    const isFav = favorites.includes(id);
    if (!premium && !isFav && favorites.length >= FREE_FAVORITE_LIMIT) {
      Alert.alert('Upgrade for unlimited favorites', 'Free users can save up to 5 favorites. Upgrade in Settings to save more.');
      return;
    }
    const updated = isFav
      ? favorites.filter((f) => f !== id)
      : [...favorites, id];
    setFavorites(updated);
    await AsyncStorage.setItem(FAVORITE_PROFILES_KEY, JSON.stringify(updated));
  };

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

  const renderItem = ({ item }) => {
    const isFav = favorites.includes(item.id);
    return (
      <Card containerStyle={styles.card}>
        <View style={styles.row}>
          <Avatar rounded source={item.image} size="medium" />
          <View style={{ flex: 1, marginLeft: theme.spacing.small }}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.subtitle}>{item.sign}</Text>
            <Text style={styles.subtitle}>Compatibility: {item.compatibility}%</Text>
            <Text style={[styles.body, { marginTop: 4 }]} numberOfLines={2}>{item.about}</Text>
          </View>
          <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
            <Icon
              name={isFav ? 'heart' : 'heart-o'}
              type="font-awesome"
              color={isFav ? theme.colors.highlight : theme.colors.text}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.pill} onPress={() => openProfile(item)}>
            <Text style={styles.pillText}>View profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.pill, styles.pillSecondary]} onPress={() => startChat(item)}>
            <Text style={[styles.pillText, { color: '#fff' }]}>Message</Text>
          </TouchableOpacity>
        </View>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Users under {sign}</Text>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: theme.spacing.large }}
      />
    </View>
  );
};

export default CompatibleUsers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.medium,
  },
  header: {
    ...theme.textStyles.header,
    marginBottom: theme.spacing.medium,
  },
  card: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.medium,
    borderColor: theme.colors.borderColor,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    ...theme.textStyles.body,
    fontWeight: 'bold',
  },
  subtitle: {
    ...theme.textStyles.subtitle,
  },
  body: {
    ...theme.textStyles.body,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: theme.spacing.small,
  },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
    backgroundColor: theme.colors.cardBackground,
  },
  pillSecondary: {
    backgroundColor: theme.colors.secondary,
    borderColor: 'transparent',
  },
  pillText: {
    ...theme.textStyles.subtitle,
  },
});
