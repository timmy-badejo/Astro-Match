import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import theme from '../color/style';

export default function MessageThreadItem({ thread, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{thread.name?.[0] || '?'}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{thread.name}</Text>
        <Text style={styles.preview} numberOfLines={1}>
          {thread.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.cardBackground,
    marginVertical: 6,
    borderRadius: theme.borderRadius.medium,
    ...theme.shadows.light,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  avatarText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
  },
  name: {
    ...theme.textStyles.body,
    fontWeight: 'bold',
  },
  preview: {
    ...theme.textStyles.subtitle,
    marginTop: 3,
  },
});
