import React, { useMemo } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '../context/ThemeContext';

const PrimaryButton = ({ title, onPress, disabled = false, style, textStyle }) => {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

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
const createStyles = (th) =>
  StyleSheet.create({
    button: {
      backgroundColor: th.colors.primary,
      paddingVertical: th.spacing.md,
      paddingHorizontal: th.spacing.lg,
      borderRadius: th.borderRadius.medium,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: th.spacing.sm,
      ...th.shadows.light,
    },
    disabled: {
      opacity: 0.5,
    },
    text: {
      ...th.textStyles.button,
    },
  });

export default PrimaryButton;
