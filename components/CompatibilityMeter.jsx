import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '../context/ThemeContext';

const getMeterColor = (pct, th) => {
  if (pct >= 71) return th.colors.success;
  if (pct >= 41) return th.colors.warning;
  return th.colors.error;
};

const CompatibilityMeter = ({ percentage = 0, size = 'md', showLabel = true }) => {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const width = size === 'lg' ? 220 : size === 'sm' ? 140 : 180;
  const barColor = getMeterColor(percentage, theme);

  return (
    <View style={[styles.container, { width }]}>
      {showLabel && <Text style={styles.label}>Compatibility</Text>}
      <View style={styles.barBackground}>
        <View style={[styles.barFill, { width: `${Math.min(percentage, 100)}%`, backgroundColor: barColor }]} />
      </View>
      <Text style={styles.percent}>{percentage}%</Text>
    </View>
  );
};

const createStyles = (th) =>
  StyleSheet.create({
    container: {
      gap: th.spacing.xs,
    },
    label: {
      ...th.textStyles.caption,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    barBackground: {
      height: 14,
      borderRadius: 999,
      backgroundColor: th.colors.overlay,
      overflow: 'hidden',
    },
    barFill: {
      height: '100%',
      borderRadius: 999,
    },
    percent: {
      ...th.textStyles.body,
      fontWeight: '700',
    },
  });

export default CompatibilityMeter;
