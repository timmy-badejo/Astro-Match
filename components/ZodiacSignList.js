import React from 'react';
import {
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { zodiacSigns } from '../data/zodiacData';
import theme from '../color/style';

const ZodiacSignList = ({ onSelectSign }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onSelectSign(item)} // full sign object
      activeOpacity={0.8}
    >
      <View style={styles.imageWrapper}>
        <Image source={item.image} style={styles.itemImage} />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDates}>{item.dates}</Text>
        <Text numberOfLines={2} style={styles.itemTraits}>
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
      numColumns={2}                    // 2-column grid
      columnWrapperStyle={styles.row}   // spacing between columns
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingVertical: 8,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  card: {
    flex: 1,
    marginVertical: 8,
    marginHorizontal: 4,
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.medium,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    ...theme.shadows.light,
  },
  imageWrapper: {
    marginRight: 10,
  },
  itemImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  textWrapper: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 4,
  },
  itemDates: {
    fontSize: 12,
    color: theme.textStyles.subtitle.color,
    marginBottom: 4,
  },
  itemTraits: {
    fontSize: 12,
    color: theme.colors.darkText,
  },
});

export default ZodiacSignList;
