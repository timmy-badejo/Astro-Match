// components/ZodiacSignList.js
import React from 'react';
import { FlatList, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { zodiacSigns } from '../data/zodiacData';
import theme from '../color/style';

const ZodiacSignList = ({ onSelectSign }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onSelectSign(item)}          // ✅ full object
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
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingVertical: 8,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.medium,
    marginVertical: 6,
    borderRadius: theme.borderRadius.medium,
    backgroundColor: theme.colors.cardBackground,
    ...theme.shadows.light,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    ...theme.textStyles.body,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  dates: {
    ...theme.textStyles.subtitle,
    marginBottom: 2,
  },
  traits: {
    ...theme.textStyles.subtitle,
  },
});

export default ZodiacSignList;
