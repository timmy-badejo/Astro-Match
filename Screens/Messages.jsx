import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import theme from '../color/style';

const mockThreads = [
  { id: '1', name: 'Alex', sign: 'Leo', lastMessage: 'See you in the stars?', time: '2m' },
  { id: '2', name: 'Sam', sign: 'Aries', lastMessage: 'Let’s compare charts!', time: '1h' },
  { id: '3', name: 'Maya', sign: 'Sagittarius', lastMessage: 'Adventure soon?', time: '3h' },
];

const MessagesScreen = () => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.avatarCircle}>
        <Text style={styles.avatarText}>{item.sign[0]}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name} — {item.sign}</Text>
        <Text style={styles.preview}>{item.lastMessage}</Text>
      </View>
      <Text style={styles.time}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>
      <FlatList
        data={mockThreads}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={{ paddingVertical: theme.spacing.small }}
      />
    </View>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.large,
  },
  title: {
    ...theme.textStyles.header,
    marginBottom: theme.spacing.medium,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.cardBackground,
    padding: theme.spacing.medium,
    borderRadius: theme.borderRadius.medium,
    ...theme.shadows.light,
  },
  avatarCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: theme.colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.small,
  },
  avatarText: {
    ...theme.textStyles.body,
    fontWeight: '700',
  },
  name: {
    ...theme.textStyles.body,
    fontWeight: '700',
  },
  preview: {
    ...theme.textStyles.subtitle,
  },
  time: {
    ...theme.textStyles.caption,
  },
  separator: {
    height: theme.spacing.small,
  },
});
