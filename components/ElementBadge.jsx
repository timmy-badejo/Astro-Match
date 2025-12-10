import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '../context/ThemeContext';

const ElementBadge = ({ element = 'Fire', size = 'md' }) => {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const background = theme.colors.elementColors[element?.toLowerCase()] || theme.colors.overlay;

  return (
    <View style={[styles.badge, styles[size], { backgroundColor: background }]}>
      <Text style={styles.text}>{element}</Text>
    </View>
  );
};

const createStyles = (th) =>
  StyleSheet.create({
    badge: {
      alignSelf: 'flex-start',
      borderRadius: 999,
    },
    sm: {
      paddingHorizontal: th.spacing.sm,
      paddingVertical: th.spacing.xs,
    },
    md: {
      paddingHorizontal: th.spacing.md,
      paddingVertical: th.spacing.xs,
    },
    lg: {
      paddingHorizontal: th.spacing.lg,
      paddingVertical: th.spacing.sm,
    },
    text: {
      ...th.textStyles.small,
      color: th.colors.text,
      fontWeight: '700',
      textTransform: 'uppercase',
    },
  });

export default ElementBadge;
