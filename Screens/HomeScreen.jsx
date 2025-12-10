import React, { useEffect, useMemo, useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Share, Alert } from 'react-native';
import { Card, Avatar, ListItem, Icon } from 'react-native-elements';
import PrimaryButton from '../components/PrimaryButton';
import { zodiacSigns } from '../data/zodiacData';
import { successStories } from '../data/successStories';
import theme from '../color/style';
import { checkInToday, getStreak } from '../utils/gamificationService';
import { getPremiumStatus } from '../utils/premiumService';
import AdBanner from '../components/AdBanner';
import { ContentService } from '../api/contentService';

const HomeScreen = ({ route, navigation }) => {
  const { name = 'Guest', zodiacSign = 'Your Sign' } = route?.params || {};
  const [streak, setStreak] = useState({ count: 0, lastCheck: null });
  const [checkedToday, setCheckedToday] = useState(false);
  const [premium, setPremium] = useState(false);
  const [weeklyContent, setWeeklyContent] = useState(null);
  const [monthlyContent, setMonthlyContent] = useState(null);
  const [articles, setArticles] = useState([]);
  const [advice, setAdvice] = useState([]);
  const contentServiceRef = useRef(new ContentService(process.env.EXPO_PUBLIC_HOROSCOPE_KEY));

  const dailyTip = useMemo(() => {
    const tips = [
      'Send a kind message to someone you matched with yesterday.',
      'Check the moon phase to plan your next meetup.',
      'Lead with curiosity—ask about a hobby in their profile.',
      'Share a cosmic fun fact to break the ice.',
    ];
    const idx = new Date().getDate() % tips.length;
    return tips[idx];
  }, []);

  const previewMatches = useMemo(() => zodiacSigns.slice(0, 3), []);
  const featuredStories = useMemo(() => successStories.slice(0, 3), []);

  const inviteFriends = async () => {
    try {
      await Share.share({
        message: 'Join me on Astro-Match—find your cosmic connection: https://example.com/invite',
      });
    } catch (e) {
      // no-op
    }
  };

  useEffect(() => {
    const loadStreak = async () => {
      const data = await getStreak();
      setStreak(data);
      setCheckedToday(data.lastCheck === new Date().toISOString().slice(0, 10));
      const prem = await getPremiumStatus();
      setPremium(!!prem.active);
    };
    loadStreak();
  }, []);

  useEffect(() => {
    const loadContent = async () => {
      const svc = contentServiceRef.current;
      const [weekly, monthly, art, tips] = await Promise.all([
        svc.getWeeklyHoroscope(zodiacSign),
        svc.getMonthlyHoroscope(zodiacSign),
        svc.getArticles(5),
        svc.getRelationshipAdvice(4),
      ]);
      setWeeklyContent(weekly);
      setMonthlyContent(monthly);
      setArticles(art);
      setAdvice(tips);
    };
    loadContent();
  }, [zodiacSign]);

  const handleCheckIn = async () => {
    const updated = await checkInToday();
    setStreak(updated);
    setCheckedToday(true);
    if (!updated.alreadyChecked) {
      Alert.alert('Checked in!', `Streak is now ${updated.count} day${updated.count === 1 ? '' : 's'}.`);
    } else {
      Alert.alert('Already checked in', 'Come back tomorrow to keep the streak going.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card containerStyle={styles.heroCard}>
        <View style={styles.heroHeader}>
          <Avatar
            rounded
            size="medium"
            source={require('../vectors/logo.png')}
            containerStyle={{ marginRight: theme.spacing.medium }}
          />
          <View>
            <Text style={styles.heroTitle}>Welcome, {name}</Text>
            <Text style={styles.heroSubtitle}>Sign: {zodiacSign}</Text>
          </View>
        </View>
        <PrimaryButton
          title="Find compatibility"
          onPress={() => navigation.navigate('ZodiacSign')}
        />
      </Card>

      <Card containerStyle={styles.card}>
        <Card.Title style={styles.cardTitle}>Daily cosmic tip</Card.Title>
        <Text style={styles.body}>{dailyTip}</Text>
      </Card>

      <Card containerStyle={styles.card}>
        <Card.Title style={styles.cardTitle}>Weekly horoscope</Card.Title>
        <Text style={styles.body}>
          {weeklyContent?.overview || weeklyContent?.horoscope || 'Fresh energy is on the way. Stay open to new connections.'}
        </Text>
      </Card>

      <Card containerStyle={styles.card}>
        <Card.Title style={styles.cardTitle}>Monthly horoscope</Card.Title>
        <Text style={styles.body}>
          {monthlyContent?.overview || monthlyContent?.horoscope || 'This month rewards consistency and honest conversations.'}
        </Text>
      </Card>

      <Card containerStyle={styles.card}>
        <Card.Title style={styles.cardTitle}>Top matches preview</Card.Title>
        {previewMatches.map((sign) => (
          <ListItem
            key={sign.id}
            bottomDivider
            containerStyle={styles.listItem}
            onPress={() => navigation.navigate('Results', { selectedSign: sign.name })}
          >
            <Avatar source={sign.image} rounded />
            <ListItem.Content>
              <ListItem.Title style={styles.listTitle}>{sign.name}</ListItem.Title>
              <ListItem.Subtitle style={styles.listSubtitle}>{sign.traits.join(' • ')}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron color={theme.colors.highlight} />
          </ListItem>
        ))}
      </Card>

      <Card containerStyle={styles.card}>
        <Card.Title style={styles.cardTitle}>Quick actions</Card.Title>
        <View style={styles.actionsRow}>
          <PrimaryButton
            title="Favorites"
            onPress={() => navigation.navigate('MainTabs', { screen: 'Favorites' })}
            style={styles.smallButton}
          />
          <PrimaryButton
            title="Messages"
            onPress={() => navigation.navigate('MainTabs', { screen: 'Messages' })}
            style={styles.smallButton}
          />
          <PrimaryButton
            title="Settings"
            onPress={() => navigation.navigate('MainTabs', { screen: 'Settings' })}
            style={styles.smallButton}
          />
          <PrimaryButton
            title="Invite"
            onPress={inviteFriends}
            style={styles.smallButton}
          />
          <PrimaryButton
            title="Zodiac Quiz"
            onPress={() => navigation.navigate('ZodiacQuiz')}
            style={styles.smallButton}
          />
        </View>
      </Card>

      <Card containerStyle={styles.card}>
        <Card.Title style={styles.cardTitle}>Daily Check-in</Card.Title>
        <Text style={styles.body}>Streak: {streak.count} day{streak.count === 1 ? '' : 's'}</Text>
        <Text style={styles.body}>Last check: {streak.lastCheck || '—'}</Text>
        <PrimaryButton
          title={checkedToday ? 'Checked in today' : 'Check in now'}
          onPress={handleCheckIn}
          disabled={checkedToday}
        />
      </Card>

      <Card containerStyle={styles.card}>
        <Card.Title style={styles.cardTitle}>Success stories</Card.Title>
        {featuredStories.map((story) => (
          <ListItem key={story.id} bottomDivider containerStyle={styles.listItem}>
            <Icon name="heart" type="feather" color={theme.colors.highlight} />
            <ListItem.Content>
              <ListItem.Title style={styles.listTitle}>{story.title}</ListItem.Title>
              <ListItem.Subtitle style={styles.listSubtitle}>
                {story.signs} • {story.outcome}
              </ListItem.Subtitle>
              <Text style={styles.body} numberOfLines={2}>{story.snippet}</Text>
            </ListItem.Content>
          </ListItem>
        ))}
      </Card>

      <Card containerStyle={styles.card}>
        <Card.Title style={styles.cardTitle}>Zodiac articles</Card.Title>
        {articles.map((article) => (
          <ListItem key={article.id} bottomDivider containerStyle={styles.listItem}>
            <Icon name="book-open" type="feather" color={theme.colors.highlight} />
            <ListItem.Content>
              <ListItem.Title style={styles.listTitle}>{article.title}</ListItem.Title>
              <ListItem.Subtitle style={styles.listSubtitle}>{article.category}</ListItem.Subtitle>
              <Text style={styles.body} numberOfLines={2}>{article.snippet}</Text>
            </ListItem.Content>
          </ListItem>
        ))}
      </Card>

      <Card containerStyle={styles.card}>
        <Card.Title style={styles.cardTitle}>Relationship advice</Card.Title>
        {advice.map((tip, idx) => (
          <Text key={tip.id || idx} style={styles.body}>{idx + 1}. {tip.tip || tip}</Text>
        ))}
      </Card>

      <ListItem
        bottomDivider
        containerStyle={styles.linkItem}
        onPress={() =>
          navigation.navigate('MainTabs', {
            screen: 'Profile',
            params: { name, selectedSign: zodiacSign },
          })
        }
      >
        <Icon name="user" type="feather" color={theme.colors.text} />
        <ListItem.Content>
          <ListItem.Title style={styles.listTitle}>View full profile</ListItem.Title>
          <ListItem.Subtitle style={styles.listSubtitle}>Update your details</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron color={theme.colors.highlight} />
      </ListItem>

      <AdBanner hidden={premium} />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.large,
    backgroundColor: theme.colors.background,
  },
  heroCard: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.large,
    borderColor: theme.colors.borderColor,
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.medium,
  },
  heroTitle: {
    ...theme.textStyles.header,
  },
  heroSubtitle: {
    ...theme.textStyles.subtitle,
  },
  card: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.medium,
    borderColor: theme.colors.borderColor,
  },
  cardTitle: {
    ...theme.textStyles.subtitle,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  body: {
    ...theme.textStyles.body,
    marginBottom: theme.spacing.small,
  },
  listItem: {
    backgroundColor: 'transparent',
  },
  listTitle: {
    ...theme.textStyles.body,
    fontWeight: 'bold',
  },
  listSubtitle: {
    ...theme.textStyles.subtitle,
  },
  actionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.small,
  },
  smallButton: {
    flex: 1,
  },
  linkItem: {
    backgroundColor: theme.colors.cardBackground,
    marginTop: theme.spacing.medium,
    borderRadius: theme.borderRadius.medium,
  },
});
