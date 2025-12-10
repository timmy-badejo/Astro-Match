import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { useAppTheme } from '../context/ThemeContext';
import { zodiacSigns } from '../data/zodiacData';
import ElementBadge from '../components/ElementBadge';
import CompatibilityMeter from '../components/CompatibilityMeter';
import PrimaryButton from '../components/PrimaryButton';

const TABS = ['Overview', 'Personality', 'Love', 'Career', 'Health'];

const ZodiacDetail = ({ route, navigation }) => {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const signName = route.params?.sign || zodiacSigns[0].name;
  const sign = zodiacSigns.find((z) => z.name === signName) || zodiacSigns[0];
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const fade = useMemo(() => new Animated.Value(1), []);

  const switchTab = (tab) => {
    Animated.sequence([
      Animated.timing(fade, { toValue: 0.35, duration: 120, useNativeDriver: true }),
      Animated.timing(fade, { toValue: 1, duration: 160, useNativeDriver: true }),
    ]).start();
    setActiveTab(tab);
  };

  const overviewContent = (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Key traits</Text>
      <Text style={styles.body}>{sign.traits?.join(', ')}</Text>
      <Text style={styles.sectionTitle}>Ruling planet</Text>
      <Text style={styles.body}>{sign.rulingPlanet || 'Sun / classic ruler for this sign'}</Text>
      <Text style={styles.sectionTitle}>Lucky trio</Text>
      <Text style={styles.body}>
        Color: {sign.luckyColor || 'Gold'} • Number: {sign.luckyNumber || '3'} • Day: {sign.luckyDay || 'Sunday'}
      </Text>
      <Text style={styles.sectionTitle}>Symbol meaning</Text>
      <Text style={styles.body}>{sign.symbolMeaning || sign.description}</Text>
    </View>
  );

  const personalityContent = (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Strengths</Text>
      <BulletList items={sign.strengths || []} />
      <Text style={styles.sectionTitle}>Weaknesses</Text>
      <BulletList items={sign.weaknesses || []} />
      <Text style={styles.sectionTitle}>Likes / Dislikes</Text>
      <BulletList items={sign.likes || ['Fresh starts', 'Creative sparks', 'Direct talk']} />
      <Text style={styles.sectionTitle}>Life philosophy</Text>
      <Text style={styles.body}>{sign.lifePhilosophy || 'Stay bold, stay honest, keep moving forward.'}</Text>
    </View>
  );

  const loveContent = (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Romantic nature</Text>
      <Text style={styles.body}>{sign.love}</Text>
      <Text style={styles.sectionTitle}>Best matches</Text>
      <Text style={styles.body}>{(sign.compatibleSigns || []).join(', ')}</Text>
      <Text style={styles.sectionTitle}>Challenging matches</Text>
      <Text style={styles.body}>{sign.challenging || 'Tends to clash with opposing styles—go slow and be curious.'}</Text>
      <Text style={styles.sectionTitle}>Dating tips</Text>
      <BulletList items={sign.datingTips || ['Lead with honesty', 'Plan something playful', 'Keep it direct']}/>
    </View>
  );

  const careerContent = (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Work strengths</Text>
      <BulletList items={sign.strengths || []} />
      <Text style={styles.sectionTitle}>Best careers</Text>
      <BulletList items={sign.bestCareers || ['Leadership', 'Creative projects', 'Fast-moving teams']} />
      <Text style={styles.sectionTitle}>Money habits</Text>
      <Text style={styles.body}>{sign.money || 'Confident with big moves; benefits from steady planning.'}</Text>
    </View>
  );

  const healthContent = (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Body rulership</Text>
      <Text style={styles.body}>{sign.bodyRulership || 'Head, face, eyes.'}</Text>
      <Text style={styles.sectionTitle}>Wellness tips</Text>
      <BulletList items={sign.wellness || ['Hydrate often', 'Mix cardio with recovery', 'Mindful breathing']} />
      <Text style={styles.sectionTitle}>Stress management</Text>
      <Text style={styles.body}>{sign.stress || 'Short bursts of activity, then grounding rituals help most.'}</Text>
    </View>
  );

  const tabContent = {
    Overview: overviewContent,
    Personality: personalityContent,
    Love: loveContent,
    Career: careerContent,
    Health: healthContent,
  };

  const goSeeUsers = () => {
    navigation.navigate('FilteredUserList', { sign: sign.name });
  };

  const compareWithMine = () => {
    navigation.navigate('CompatibilitySearch', { presetSign: sign.name });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: theme.spacing.xl }}>
      <View style={styles.hero}>
        <View style={styles.heroLeft}>
          <View style={styles.symbol} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{sign.name}</Text>
          <Text style={styles.subtitle}>{sign.dates}</Text>
          <ElementBadge element={sign.element} />
          <Text style={[styles.body, { marginTop: theme.spacing.sm }]}>{sign.description}</Text>
        </View>
      </View>

      <View style={styles.tabs}>
        {TABS.map((tab) => {
          const active = activeTab === tab;
          return (
            <TouchableOpacity key={tab} style={[styles.tab, active && styles.tabActive]} onPress={() => switchTab(tab)}>
              <Text style={[styles.tabText, active && styles.tabTextActive]}>{tab}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Animated.View style={{ opacity: fade }}>
        {tabContent[activeTab]}
      </Animated.View>

      <View style={[styles.section, { marginTop: theme.spacing.lg }]}>
        <CompatibilityMeter percentage={sign.compatibility || 0} size="md" />
        <View style={styles.actionRow}>
          <PrimaryButton title={`See ${sign.name} Users`} onPress={goSeeUsers} style={{ flex: 1 }} />
          <PrimaryButton title="Compare with my sign" onPress={compareWithMine} style={{ flex: 1, marginLeft: theme.spacing.sm }} />
        </View>
      </View>
    </ScrollView>
  );
};

const BulletList = ({ items }) => {
  const { theme } = useAppTheme();
  if (!items?.length) return null;
  return (
    <View style={{ marginTop: theme.spacing.xs }}>
      {items.map((item) => (
        <View key={item} style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 4 }}>
          <Text style={[theme.textStyles.body, { marginRight: 6 }]}>•</Text>
          <Text style={theme.textStyles.body}>{item}</Text>
        </View>
      ))}
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
    hero: {
      flexDirection: 'row',
      gap: th.spacing.medium,
      backgroundColor: th.colors.cardBackground,
      padding: th.spacing.medium,
      borderRadius: th.borderRadius.large,
      borderWidth: 1,
      borderColor: th.colors.borderColor,
      ...th.shadows.light,
    },
    heroLeft: {
      width: 88,
      height: 88,
      borderRadius: 44,
      backgroundColor: th.colors.overlay,
    },
    symbol: {
      flex: 1,
      borderRadius: 44,
      backgroundColor: th.colors.primary,
      opacity: 0.4,
    },
    title: {
      ...th.textStyles.header,
    },
    subtitle: {
      ...th.textStyles.subtitle,
      marginBottom: th.spacing.xs,
    },
    tabs: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: th.spacing.xs,
      marginTop: th.spacing.medium,
    },
    tab: {
      paddingHorizontal: th.spacing.md,
      paddingVertical: th.spacing.xs,
      borderRadius: th.borderRadius.medium,
      borderWidth: 1,
      borderColor: th.colors.borderColor,
      backgroundColor: th.colors.cardBackground,
    },
    tabActive: {
      backgroundColor: th.colors.primary,
      borderColor: 'transparent',
    },
    tabText: {
      ...th.textStyles.caption,
    },
    tabTextActive: {
      color: '#fff',
      fontWeight: '700',
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
      marginTop: th.spacing.sm,
    },
    body: {
      ...th.textStyles.body,
      marginTop: 4,
    },
    actionRow: {
      flexDirection: 'row',
      marginTop: th.spacing.medium,
      alignItems: 'center',
    },
  });

export default ZodiacDetail;
