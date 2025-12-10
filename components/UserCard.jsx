import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { useAppTheme } from '../context/ThemeContext';
import ElementBadge from './ElementBadge';
import CompatibilityMeter from './CompatibilityMeter';

const UserCard = ({ user, orientation = 'vertical', showCompatibility = true, onPress, onFavorite }) => {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme, orientation), [theme, orientation]);
  if (!user) return null;

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={onPress}>
      <View style={styles.headerRow}>
        <Image source={user.image} style={styles.avatar} />
        <View style={{ flex: 1, marginLeft: theme.spacing.sm }}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.meta}>{user.age ? `${user.age} • ` : ''}{user.location || user.sign}</Text>
          <ElementBadge element={user.element || user.signElement || 'Fire'} size="sm" />
        </View>
        {onFavorite ? (
          <TouchableOpacity onPress={onFavorite}>
            <Icon name="heart" type="feather" color={theme.colors.highlight} />
          </TouchableOpacity>
        ) : null}
      </View>

      <Text style={styles.about} numberOfLines={2}>{user.about || user.catchPhrase}</Text>
      {showCompatibility && (
        <View style={styles.meterRow}>
          <CompatibilityMeter percentage={user.compatibility || 0} size="sm" />
        </View>
      )}
    </TouchableOpacity>
  );
};

const createStyles = (th, orientation) =>
  StyleSheet.create({
    card: {
      backgroundColor: th.colors.cardBackground,
      borderRadius: th.borderRadius.medium,
      borderWidth: 1,
      borderColor: th.colors.borderColor,
      padding: th.spacing.medium,
      width: orientation === 'horizontal' ? '100%' : '100%',
      ...th.shadows.light,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: th.spacing.sm,
    },
    avatar: {
      width: 52,
      height: 52,
      borderRadius: 26,
    },
    name: {
      ...th.textStyles.body,
      fontWeight: '700',
    },
    meta: {
      ...th.textStyles.subtitle,
    },
    about: {
      ...th.textStyles.body,
    },
    meterRow: {
      marginTop: th.spacing.sm,
    },
  });

export default UserCard;
