import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import PrimaryButton from '../components/PrimaryButton';
import theme from '../color/style';
import { mockUsers } from '../data/mockUsers';

const UserProfile = ({ route, navigation }) => {
  const passedUser = route.params?.user;
  const user =
    passedUser ||
    mockUsers.find((u) => u.id === route.params?.userId) ||
    null;

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>No profile found</Text>
        <PrimaryButton title="Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  const startPhotoThread = () => {
    navigation.navigate('PhotoThread', {
      thread: {
        id: `${user.id}-photos`,
        signName: `${user.name} • Photos`,
        partnerImage: user.image,
        history:
          user.threadHistory && user.threadHistory.length
            ? user.threadHistory
            : [{ id: `${user.id}-photo-hello`, from: 'them', text: 'Let’s swap a few favorite shots.' }],
      },
    });
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <Avatar rounded source={user.image} size="large" />
        <View style={{ flex: 1, marginLeft: theme.spacing.medium }}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.meta}>{user.sign} • {user.location || 'Somewhere out there'}</Text>
          <Text style={styles.meta}>{user.occupation || 'In the stars'}</Text>
        </View>
        <View style={styles.scorePill}>
          <Icon name="star" type="feather" color={theme.colors.highlight} size={16} />
          <Text style={styles.scoreText}>{user.compatibility}%</Text>
        </View>
      </View>

      <Text style={styles.sectionLabel}>About</Text>
      <Text style={styles.body}>{user.about}</Text>

      {user.insight ? (
        <>
          <Text style={styles.sectionLabel}>Insight</Text>
          <Text style={styles.body}>{user.insight}</Text>
        </>
      ) : null}

      {!!user.interests?.length && (
        <>
          <Text style={styles.sectionLabel}>Interests</Text>
          <View style={styles.chipsRow}>
            {user.interests.map((interest) => (
              <View key={interest} style={styles.chip}>
                <Text style={styles.chipText}>{interest}</Text>
              </View>
            ))}
          </View>
        </>
      )}

      <View style={styles.actions}>
        <PrimaryButton
          title="Share Photos"
          onPress={startPhotoThread}
          style={{ flex: 1, marginRight: 6 }}
        />
        <PrimaryButton
          title="Start Chat"
          onPress={startChat}
          style={{ flex: 1, marginLeft: 6, backgroundColor: theme.colors.secondary }}
        />
      </View>

      <PrimaryButton
        title="Back to results"
        onPress={() => navigation.goBack()}
        style={{ backgroundColor: theme.colors.cardBackground }}
        textStyle={{ color: theme.colors.text }}
      />
    </ScrollView>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.large,
    gap: theme.spacing.small,
  },
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.cardBackground,
    padding: theme.spacing.medium,
    borderRadius: theme.borderRadius.medium,
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
    ...theme.shadows.light,
  },
  name: {
    ...theme.textStyles.header,
  },
  meta: {
    ...theme.textStyles.subtitle,
  },
  scorePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.overlay,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  scoreText: {
    ...theme.textStyles.body,
    marginLeft: 4,
  },
  sectionLabel: {
    ...theme.textStyles.body,
    fontWeight: 'bold',
    marginTop: theme.spacing.small,
  },
  body: {
    ...theme.textStyles.body,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  chip: {
    backgroundColor: theme.colors.cardBackground,
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  chipText: {
    ...theme.textStyles.subtitle,
  },
  actions: {
    flexDirection: 'row',
    marginTop: theme.spacing.medium,
  },
});
