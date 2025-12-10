import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput } from 'react-native';
import { Card, Chip } from 'react-native-elements';
import { zodiacSigns } from '../data/zodiacData';
import MatchCard from '../components/MatchCard';
import PrimaryButton from '../components/PrimaryButton';
import theme from '../color/style';

const ProfileScreen = ({ route, navigation }) => {
  const { name = 'Guest', selectedSign = 'Unknown', profile = {} } = route?.params || {};
  const [about, setAbout] = useState(profile.about || 'Add a few lines about yourself...');

  const signData = useMemo(() => zodiacSigns.find((s) => s.name === selectedSign), [selectedSign]);
  const matches = useMemo(
    () => (signData ? zodiacSigns.filter((s) => signData.compatibleSigns.includes(s.name)) : []),
    [signData],
  );

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
            {profile.relationshipType ? (
              <Chip
                title={profile.relationshipType}
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
          onChangeText={setAbout}
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
      </Card>

      <Text style={[styles.subHeader, { textAlign: 'center' }]}>Best Matches</Text>
      <View style={styles.matchesRow}>
        {matches.map((sign) => (
          <MatchCard
            key={sign.id}
            sign={sign}
            onPress={() =>
              navigation.navigate('Messages', {
                signName: sign.name,
              })
            }
          />
        ))}
      </View>

      <PrimaryButton
        title="View Favorites"
        onPress={() => navigation.navigate('Favorites')}
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
