import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { zodiacSigns } from '../data/zodiacData';
import MatchCard from '../components/MatchCard';
import PrimaryButton from '../components/PrimaryButton';
import theme from '../color/style';

const ProfileScreen = ({ route, navigation }) => {
  const { name = 'Guest', selectedSign = 'Unknown' } = route?.params || {};

  const signData = zodiacSigns.find((s) => s.name === selectedSign);
  const matches = signData
    ? zodiacSigns.filter((s) => signData.compatibleSigns.includes(s.name))
    : [];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Your Profile</Text>
      <Image
        source={require('../vectors/profileimage.jpg')}
        style={styles.profileImage}
      />
      <Text style={styles.text}>Name: {name}</Text>
      <Text style={styles.text}>Zodiac Sign: {selectedSign}</Text>

      <Text style={styles.subHeader}>Best Matches</Text>
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
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: theme.spacing.medium,
  },
  text: {
    ...theme.textStyles.body,
    marginVertical: 4,
    textAlign: 'center',
  },
  subHeader: {
    ...theme.textStyles.body,
    fontWeight: 'bold',
    marginTop: theme.spacing.large,
    marginBottom: theme.spacing.small,
  },
});

export default ProfileScreen;
