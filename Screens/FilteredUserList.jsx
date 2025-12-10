import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useAppTheme } from '../context/ThemeContext';
import { mockUsers } from '../data/mockUsers';
import UserCard from '../components/UserCard';

const FilteredUserList = ({ route, navigation }) => {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const sign = route.params?.sign;
  const [sort, setSort] = useState('compatibility');

  const filtered = mockUsers.filter((u) => !sign || u.sign === sign);
  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'name') return a.name.localeCompare(b.name);
    return (b.compatibility || 0) - (a.compatibility || 0);
  });

  const renderItem = ({ item }) => (
    <UserCard
      user={item}
      onPress={() => navigation.navigate('UserDetail', { user: item })}
      showCompatibility
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{sign ? `${sign} Users` : 'Users'}</Text>
        <Text style={styles.subtitle}>{sorted.length} found</Text>
      </View>

      <View style={styles.filterRow}>
        <Text style={styles.filterLabel}>Sort by:</Text>
        <TouchableOpacity
          style={[styles.pill, sort === 'compatibility' && styles.pillActive]}
          onPress={() => setSort('compatibility')}
        >
          <Text style={styles.pillText}>Compatibility</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.pill, sort === 'name' && styles.pillActive]}
          onPress={() => setSort('name')}
        >
          <Text style={styles.pillText}>Name</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={sorted}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: theme.spacing.sm }} />}
        contentContainerStyle={{ paddingBottom: theme.spacing.xl }}
      />
    </View>
  );
};

const createStyles = (th) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: th.colors.background,
      padding: th.spacing.medium,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: th.spacing.sm,
    },
    title: {
      ...th.textStyles.header,
    },
    subtitle: {
      ...th.textStyles.subtitle,
    },
    filterRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: th.spacing.xs,
      marginBottom: th.spacing.sm,
    },
    filterLabel: {
      ...th.textStyles.caption,
    },
    pill: {
      paddingHorizontal: th.spacing.sm,
      paddingVertical: th.spacing.xs,
      borderRadius: th.borderRadius.medium,
      borderWidth: 1,
      borderColor: th.colors.borderColor,
      backgroundColor: th.colors.cardBackground,
    },
    pillActive: {
      backgroundColor: th.colors.primary,
      borderColor: 'transparent',
    },
    pillText: {
      ...th.textStyles.caption,
      color: th.colors.text,
    },
  });

export default FilteredUserList;
