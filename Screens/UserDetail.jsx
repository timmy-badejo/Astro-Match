import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppTheme } from '../context/ThemeContext';
import { mockUsers } from '../data/mockUsers';
import ElementBadge from '../components/ElementBadge';
import CompatibilityMeter from '../components/CompatibilityMeter';
import PrimaryButton from '../components/PrimaryButton';

const FAVORITE_PROFILES_KEY = '@astromatch:favorite-profiles';

const UserDetail = ({ route, navigation }) => {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const passedUser = route.params?.user;
  const user =
    passedUser ||
    mockUsers.find((u) => u.id === route.params?.userId) ||
    null;
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavs = async () => {
      const stored = await AsyncStorage.getItem(FAVORITE_PROFILES_KEY);
      setFavorites(stored ? JSON.parse(stored) : []);
    };
    loadFavs();
  }, []);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>User not found</Text>
      </View>
    );
  }

  const isFav = favorites.includes(user.id);

  const toggleFavorite = async () => {
    const updated = isFav ? favorites.filter((id) => id !== user.id) : [...favorites, user.id];
    setFavorites(updated);
    await AsyncStorage.setItem(FAVORITE_PROFILES_KEY, JSON.stringify(updated));
  };

  const startChat = () => {
    navigation.navigate('ChatThread', {
      thread: {
        id: user.id,
        signName: user.name,
        lastMessage: user.threadHistory?.slice(-1)[0]?.text || 'Say hi and break the ice.',
        history:
          user.threadHistory && user.threadHistory.length
            ? user.threadHistory
            : [{ id: `${user.id}-hello`, from: 'them', text: 'Hey there! Ready to vibe?' }],
      },
    });
  };

  const goReport = () => {
    // placeholder for future report flow
  };

  const shareProfile = async () => {
    try {
      await Share.share({
        message: `Check out ${user.name}'s profile on Astro-Match (${user.sign}) https://example.com/user/${user.id}`,
      });
    } catch (e) {
      // ignore
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: theme.spacing.xl }}>
      <View style={styles.hero}>
        <Avatar rounded source={user.image} size="large" />
        <View style={{ flex: 1, marginLeft: theme.spacing.medium }}>
          <Text style={styles.title}>{user.name}{user.age ? `, ${user.age}` : ''}</Text>
          <Text style={styles.subtitle}>{user.location || 'Somewhere'} • {user.sign}</Text>
          <ElementBadge element={user.signElement || 'Fire'} />
        </View>
        <TouchableOpacity onPress={toggleFavorite}>
          <Icon
            name={isFav ? 'heart' : 'heart-o'}
            type="font-awesome"
            color={isFav ? theme.colors.highlight : theme.colors.text}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <CompatibilityMeter percentage={user.compatibility || 0} size="lg" />
        <Text style={styles.body}>Love: {user.loveScore || user.compatibility - 2 || 80}% • Friendship: {user.friendScore || user.compatibility - 4 || 78}% • Career: {user.careerScore || user.compatibility - 6 || 76}%</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.body}>{user.about}</Text>
        <Text style={styles.sectionTitle}>Purpose</Text>
        <View style={styles.chipRow}>
          {(user.purpose || ['Find Love', 'Make Friends']).map((p) => (
            <View key={p} style={styles.chip}><Text style={styles.chipText}>{p}</Text></View>
          ))}
        </View>
        <Text style={styles.sectionTitle}>Interests</Text>
        <View style={styles.chipRow}>
          {user.interests?.map((i) => (
            <View key={i} style={styles.chip}><Text style={styles.chipText}>{i}</Text></View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Compatibility breakdown</Text>
        <Text style={styles.body}>{user.insight || 'High vibes and easy conversation.'}</Text>
        <Text style={styles.body}>Challenges: {user.challenges || 'Align pacing early and keep communication clear.'}</Text>
      </View>

      <View style={styles.actions}>
        <PrimaryButton title="Message" onPress={startChat} style={{ flex: 1 }} />
        <PrimaryButton
          title={isFav ? 'Remove Favorite' : 'Add to Favorites'}
          onPress={toggleFavorite}
          style={{ flex: 1, marginLeft: theme.spacing.sm, backgroundColor: theme.colors.secondary }}
        />
        <PrimaryButton
          title="Share Profile"
          onPress={shareProfile}
          style={{ flex: 1, marginLeft: theme.spacing.sm }}
        />
      </View>

      <TouchableOpacity style={styles.report} onPress={goReport}>
        <Icon name="more-horizontal" type="feather" color={theme.colors.textSecondary} />
        <Text style={styles.reportText}>Block / Report (coming soon)</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const createStyles = (th) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: th.colors.background,
      padding: th.spacing.medium,
    },
    hero: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: th.colors.cardBackground,
      padding: th.spacing.medium,
      borderRadius: th.borderRadius.large,
      borderWidth: 1,
      borderColor: th.colors.borderColor,
      ...th.shadows.light,
    },
    title: {
      ...th.textStyles.header,
    },
    subtitle: {
      ...th.textStyles.subtitle,
    },
    section: {
      marginTop: th.spacing.medium,
      padding: th.spacing.medium,
      backgroundColor: th.colors.cardBackground,
      borderRadius: th.borderRadius.medium,
      borderWidth: 1,
      borderColor: th.colors.borderColor,
    },
    sectionTitle: {
      ...th.textStyles.subtitle,
      fontWeight: '700',
      marginBottom: th.spacing.xs,
    },
    body: {
      ...th.textStyles.body,
      marginTop: 4,
    },
    chipRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: th.spacing.xs,
      marginTop: th.spacing.xs,
    },
    chip: {
      paddingHorizontal: th.spacing.sm,
      paddingVertical: th.spacing.xs,
      backgroundColor: th.colors.overlay,
      borderRadius: th.borderRadius.small,
    },
    chipText: {
      ...th.textStyles.small,
    },
    actions: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: th.spacing.sm,
      marginTop: th.spacing.large,
    },
    report: {
      marginTop: th.spacing.medium,
      flexDirection: 'row',
      alignItems: 'center',
      gap: th.spacing.xs,
      alignSelf: 'center',
    },
    reportText: {
      ...th.textStyles.caption,
    },
  });

export default UserDetail;
