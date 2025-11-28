import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import theme from '../color/style';

const MessageThreadItem = ({ signName, lastMessage, onPress }) => {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{signName.charAt(0)}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.signName}>{signName}</Text>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: theme.spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderColor,
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.medium,
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
  },
  signName: {
    ...theme.textStyles.body,
    fontWeight: 'bold',
  },
  lastMessage: {
    ...theme.textStyles.subtitle,
  },
});

export default MessageThreadItem;
