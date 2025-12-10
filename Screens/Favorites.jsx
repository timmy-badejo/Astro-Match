// Screens/Favorites.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ListItem, Avatar, CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { zodiacSigns } from '../data/zodiacData';
import theme from '../color/style';
import PrimaryButton from '../components/PrimaryButton';


const FAVORITES_KEY = '@astromatch:favorites';

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [alertPrefs, setAlertPrefs] = useState({});

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

  const toggleAlert = (name) => {
    setAlertPrefs((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const renderItem = ({ item }) => (
    <ListItem
      bottomDivider
      containerStyle={styles.listItem}
      onPress={() => navigation.navigate('Results', { selectedSign: item.name })}
    >
      <Avatar source={item.image} rounded />
      <ListItem.Content>
        <ListItem.Title style={styles.title}>{item.name}</ListItem.Title>
        <ListItem.Subtitle style={styles.subtitle}>{item.dates}</ListItem.Subtitle>
        <CheckBox
          title="Notify me about this match"
          checked={!!alertPrefs[item.name]}
          onPress={() => toggleAlert(item.name)}
          containerStyle={styles.checkbox}
          textStyle={styles.checkboxText}
        />
      </ListItem.Content>
      <PrimaryButton
        title="Remove"
        onPress={() => removeFavorite(item.name)}
        style={styles.removeButton}
        textStyle={{ color: '#fff', fontSize: 12 }}
      />
      <ListItem.Chevron color={theme.colors.highlight} />
    </ListItem>
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
  listItem: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.medium,
    marginHorizontal: theme.spacing.medium,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
  },
  title: {
    ...theme.textStyles.body,
    fontWeight: 'bold',
  },
  subtitle: {
    ...theme.textStyles.subtitle,
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingHorizontal: 0,
  },
  checkboxText: {
    ...theme.textStyles.subtitle,
  },
  removeButton: {
    backgroundColor: theme.colors.error,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
});

export default FavoritesScreen;
