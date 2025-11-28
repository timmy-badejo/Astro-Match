import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import theme from '../color/style';

export default function PrimaryButton({ title, onPress, disabled }) {
  return (
    <TouchableOpacity
      style={[styles.button, { opacity: disabled ? 0.5 : 1 }]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.85}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    borderRadius: theme.borderRadius.medium,
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
    ...theme.shadows.light,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: theme.textStyles.button.fontFamily,
  },
});
