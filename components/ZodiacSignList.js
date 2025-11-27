// components/ZodiacSignList.js
import React from 'react';
import {
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { zodiacSigns } from '../data/zodiacData'; // Shared zodiac data source
import theme from '../color/style'; // Use shared theme for colors, spacing, etc.

const ZodiacSignList = ({ onSelectSign }) => {
  const handlePress = (sign) => {
    if (onSelectSign) {
      // Pass the full sign object up to ZodiacSignScreen
      onSelectSign(sign);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handlePress(item)}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={`Select ${item.name}`}
    >
      <Image source={item.image} style={styles.avatar} />

      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.dates}>{item.dates}</Text>

        {/* Traits in one line, trimmed if too long */}
        <Text style={styles.traits} numberOfLines={1}>
          {item.traits.join(' • ')}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={zodiacSigns}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.listContent}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: theme.spacing.small,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.medium,
    minHeight: 72, // Larger tap target
    ...theme.shadows.light,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: theme.spacing.medium,
  },
  info: {
    flex: 1,
  },
  name: {
    ...theme.textStyles.header,
    fontSize: 20,
    marginBottom: 4,
  },
  dates: {
    ...theme.textStyles.subtitle,
    marginBottom: 2,
  },
  traits: {
    ...theme.textStyles.body,
    fontSize: 14,
  },
  separator: {
    height: theme.spacing.small,
  },
});

export default ZodiacSignList;

