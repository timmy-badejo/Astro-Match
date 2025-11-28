import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import theme from '../color/style';

export default function MatchCard({ sign, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <Image source={sign.image} style={styles.image} />
      <Text style={styles.title}>{sign.name}</Text>
      <Text style={styles.subtitle}>{sign.dates}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    padding: 12,
    borderRadius: theme.borderRadius.medium,
    backgroundColor: theme.colors.cardBackground,
    margin: 10,
    width: 120,
    ...theme.shadows.light,
  },
  image: {
    width: 64,
    height: 64,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  title: {
    ...theme.textStyles.body,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  subtitle: {
    ...theme.textStyles.subtitle,
  },
});
