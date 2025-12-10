// components/ZodiacSignList.jsx
import React from 'react';
import { FlatList, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { zodiacSigns } from '../data/zodiacData';
import theme from '../color/style';

export default function ZodiacSignList({ onSelectSign }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onSelectSign(item)}
      activeOpacity={0.8}
    >
      <Image source={item.image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.dates}>{item.dates}</Text>
        <Text style={styles.traits} numberOfLines={1}>
          {item.traits.join(' • ')}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={zodiacSigns}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingVertical: 10,
    paddingHorizontal: theme.spacing.medium,
  },
  card: {
    flexDirection: 'row',
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.medium,
    marginVertical: 6,
    alignItems: 'center',
    ...theme.shadows.light,
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginRight: 14,
    resizeMode: 'contain',
  },
  textContainer: { flex: 1 },
  name: {
    ...theme.textStyles.body,
    fontWeight: 'bold',
  },
  dates: {
    ...theme.textStyles.subtitle,
    marginTop: 2,
  },
  traits: {
    ...theme.textStyles.subtitle,
    marginTop: 4,
    flexShrink: 1,
  },
});
