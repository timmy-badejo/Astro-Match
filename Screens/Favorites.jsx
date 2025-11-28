// Screens/Favorites.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { zodiacSigns } from '../data/zodiacData';
import theme from '../color/style';
import MatchCard from '../components/MatchCard';
import PrimaryButton from '../components/PrimaryButton';


const FAVORITES_KEY = '@astromatch:favorites';

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      const names = stored ? JSON.parse(stored) : [];
      const mapped = zodiacSigns.filter((s) => names.includes(s.name));
      setFavorites(mapped);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadFavorites);
    return unsubscribe;
  }, [navigation]);

  const removeFavorite = async (name) => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      const names = stored ? JSON.parse(stored) : [];
      const updated = names.filter((n) => n !== name);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      setFavorites((prev) => prev.filter((s) => s.name !== name));
    } catch (e) {
      console.log(e);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.cardWrapper}>
      <MatchCard
        sign={item}
        onPress={() =>
          navigation.navigate('Results', { selectedSign: item.name })
        }
      />
      <View style={styles.actions}>
        <PrimaryButton
          title="View"
          onPress={() => navigation.navigate('Results', { selectedSign: item.name })}
          style={styles.actionButton}
        />
        <PrimaryButton
          title="Remove"
          onPress={() => removeFavorite(item.name)}
          style={[styles.actionButton, styles.removeButton]}
          textStyle={{ color: '#fff' }}
        />
      </View>
    </View>
  );

  if (!favorites.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No favorites yet</Text>
        <Text style={styles.emptyText}>
          Add some signs from the results screen, and they’ll appear here.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: theme.spacing.medium }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.large,
  },
  emptyTitle: {
    ...theme.textStyles.header,
    marginBottom: 8,
  },
  emptyText: {
    ...theme.textStyles.body,
    textAlign: 'center',
  },
  cardWrapper: {
    marginBottom: theme.spacing.medium,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 6,
  },
  actionButton: {
    flex: 1,
    width: 'auto',
    paddingVertical: 10,
    marginRight: theme.spacing.small,
  },
  removeButton: {
    backgroundColor: theme.colors.error,
    marginRight: 0,
  },
});

export default FavoritesScreen;
