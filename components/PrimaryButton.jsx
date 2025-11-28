import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import theme from '../color/style';

const PrimaryButton = ({ title, onPress, disabled = false, style, textStyle }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.buttonStyles.backgroundColor,
    paddingVertical: theme.buttonStyles.paddingVertical,
    paddingHorizontal: theme.buttonStyles.paddingHorizontal,
    borderRadius: theme.buttonStyles.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: theme.spacing.small,
    ...theme.shadows.light,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    ...theme.textStyles.button,
  },
});

export default PrimaryButton;
