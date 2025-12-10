import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput } from 'react-native';
import { Card, Chip } from 'react-native-elements';
import { zodiacSigns } from '../data/zodiacData';
import MatchCard from '../components/MatchCard';
import PrimaryButton from '../components/PrimaryButton';
import theme from '../color/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const ProfileScreen = ({ route, navigation }) => {
  const initialProfile = route?.params?.profile || {};
  const [profile, setProfile] = useState(initialProfile);
  const [about, setAbout] = useState(initialProfile.about || 'Add a few lines about yourself...');
  const name = profile.name || 'Guest';
  const selectedSign = profile.autoSign || route?.params?.selectedSign || 'Unknown';

  const signData = useMemo(() => zodiacSigns.find((s) => s.name === selectedSign), [selectedSign]);
  const matches = useMemo(
    () => (signData ? zodiacSigns.filter((s) => signData.compatibleSigns.includes(s.name)) : []),
    [signData],
  );

  useFocusEffect(
    React.useCallback(() => {
      const loadProfile = async () => {
        const stored = await AsyncStorage.getItem('@astromatch:profile');
        if (stored) {
          const parsed = JSON.parse(stored);
          setProfile(parsed);
          setAbout(parsed.about || 'Add a few lines about yourself...');
        }
      };
      loadProfile();
    }, []),
  );

  const saveAbout = async (text) => {
    setAbout(text);
    const next = { ...profile, about: text };
    setProfile(next);
    await AsyncStorage.setItem('@astromatch:profile', JSON.stringify(next));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Your Profile</Text>

      <Card containerStyle={styles.card}>
        <View style={styles.topRow}>
          <Image source={require('../vectors/profileimage.jpg')} style={styles.profileImage} />
          <View style={{ flex: 1, marginLeft: theme.spacing.medium }}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.signLabel}>{selectedSign}</Text>
            <Text style={styles.meta}>{profile.email}</Text>
            <Text style={styles.meta}>{profile.dob}</Text>
            <Text style={styles.meta}>{profile.gender}</Text>
            {Array.isArray(profile.relationshipType) && profile.relationshipType.length
              ? profile.relationshipType.map((rel) => (
                <Chip
                  key={rel}
                  title={rel}
                  buttonStyle={{ backgroundColor: theme.colors.overlay }}
                  titleStyle={{ color: theme.colors.text }}
                  containerStyle={{ marginTop: 6, alignSelf: 'flex-start' }}
                />
              ))
              : null}
            {profile.relationshipTypeOther ? (
              <Chip
                title={profile.relationshipTypeOther}
                buttonStyle={{ backgroundColor: theme.colors.overlay }}
                titleStyle={{ color: theme.colors.text }}
                containerStyle={{ marginTop: 6, alignSelf: 'flex-start' }}
              />
            ) : null}
          </View>
        </View>

        <Text style={styles.subHeader}>About me</Text>
        <TextInput
          value={about}
          onChangeText={saveAbout}
          multiline
          style={styles.aboutInput}
          placeholder="Share what makes you unique..."
          placeholderTextColor={theme.textStyles.subtitle.color}
        />
      </Card>

      <Card containerStyle={styles.card}>
        <Text style={styles.subHeader}>Your sign insights</Text>
        <Text style={styles.body}>{signData?.description}</Text>
        <Text style={[styles.body, { marginTop: 8 }]}>Traits: {signData?.traits.join(' • ')}</Text>
        <Text style={[styles.body, { marginTop: 8 }]}>
          Compatible with: {signData?.compatibleSigns.join(', ')}
        </Text>
        <Text style={[styles.body, { marginTop: 8 }]}>Element: {signData?.element}</Text>
        <Text style={[styles.body, { marginTop: 8 }]}>Mood: {signData?.mood}</Text>
      </Card>

      <Text style={[styles.subHeader, { textAlign: 'center' }]}>Best Matches</Text>
      <View style={styles.matchesRow}>
        {matches.map((sign) => (
          <MatchCard
            key={sign.id}
            sign={sign}
            onPress={() =>
              navigation.navigate('CompatibleUsers', { sign: sign.name, profile })
            }
          />
        ))}
      </View>

      <PrimaryButton
        title="View Favorites"
        onPress={() => navigation.navigate('Favorites')}
      />
      <PrimaryButton
        title="Edit Profile"
        onPress={() => navigation.navigate('CreateProfile', { profile })}
        style={{ backgroundColor: theme.colors.secondary }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.large,
    backgroundColor: theme.colors.background,
  },
  header: {
    ...theme.textStyles.header,
    marginBottom: theme.spacing.medium,
    textAlign: 'center',
  },
  card: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.medium,
    borderColor: theme.colors.borderColor,
    marginBottom: theme.spacing.medium,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.medium,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  name: {
    ...theme.textStyles.header,
    fontSize: 22,
  },
  signLabel: {
    ...theme.textStyles.subtitle,
    marginTop: 4,
  },
  meta: {
    ...theme.textStyles.subtitle,
  },
  subHeader: {
    ...theme.textStyles.header,
    fontSize: 18,
    marginBottom: theme.spacing.small,
  },
  aboutInput: {
    minHeight: 100,
    borderRadius: theme.borderRadius.medium,
    backgroundColor: theme.colors.cardBackground,
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
    padding: 12,
    color: theme.colors.text,
    textAlignVertical: 'top',
  },
  body: {
    ...theme.textStyles.body,
  },
  matchesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
});

export default ProfileScreen;
