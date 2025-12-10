import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '../context/ThemeContext';

const AdBanner = ({ hidden }) => {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  if (hidden) return null;
  return (
    <View style={styles.banner}>
      <Text style={styles.title}>Ad</Text>
      <Text style={styles.body}>Upgrade to Premium for an ad-free experience.</Text>
    </View>
  );
};

const createStyles = (th) =>
  StyleSheet.create({
    banner: {
      padding: th.spacing.medium,
      borderRadius: th.borderRadius.medium,
      backgroundColor: th.colors.overlay,
      borderWidth: 1,
      borderColor: th.colors.borderColor,
      marginTop: th.spacing.medium,
    },
    title: {
      ...th.textStyles.subtitle,
      fontWeight: '700',
    },
    body: {
      ...th.textStyles.body,
    },
  });

export default AdBanner;
