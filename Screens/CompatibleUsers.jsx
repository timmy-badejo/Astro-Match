import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Card, Avatar, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mockUsers } from '../data/mockUsers';
import theme from '../color/style';

const FAVORITE_PROFILES_KEY = '@astromatch:favorite-profiles';

const CompatibleUsers = ({ route }) => {
  const { sign, profile } = route.params || {};
  const [favorites, setFavorites] = useState([]);

  const filtered = useMemo(
    () => mockUsers.filter((u) => u.sign === sign),
    [sign],
  );

  useEffect(() => {
    const load = async () => {
      const stored = await AsyncStorage.getItem(FAVORITE_PROFILES_KEY);
      setFavorites(stored ? JSON.parse(stored) : []);
    };
    load();
  }, []);

  const toggleFavorite = async (id) => {
    const updated = favorites.includes(id)
      ? favorites.filter((f) => f !== id)
      : [...favorites, id];
    setFavorites(updated);
    await AsyncStorage.setItem(FAVORITE_PROFILES_KEY, JSON.stringify(updated));
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
});
