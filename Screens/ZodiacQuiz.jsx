import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share, Alert } from 'react-native';
import { useAppTheme } from '../context/ThemeContext';
import PrimaryButton from '../components/PrimaryButton';
import { saveQuizScore } from '../utils/gamificationService';

const QUESTIONS = [
  {
    q: 'Which element does Leo belong to?',
    options: ['Fire', 'Earth', 'Air', 'Water'],
    answer: 'Fire',
  },
  {
    q: 'Which sign is ruled by Venus?',
    options: ['Taurus', 'Scorpio', 'Aries', 'Sagittarius'],
    answer: 'Taurus',
  },
  {
    q: 'What dates map to Pisces?',
    options: ['Jan 20 - Feb 18', 'Feb 19 - Mar 20', 'Aug 23 - Sep 22', 'Nov 22 - Dec 21'],
    answer: 'Feb 19 - Mar 20',
  },
  {
    q: 'Which element group includes Gemini?',
    options: ['Fire', 'Earth', 'Air', 'Water'],
    answer: 'Air',
  },
  {
    q: 'Capricorn’s best known strength?',
    options: ['Dreamy', 'Impulsive', 'Disciplined', 'Detached'],
    answer: 'Disciplined',
  },
];

const ZodiacQuiz = ({ navigation }) => {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const selectOption = (idx, option) => {
    setAnswers((prev) => ({ ...prev, [idx]: option }));
  };

  const submit = async () => {
    const total = QUESTIONS.reduce((sum, q, idx) => {
      return sum + (answers[idx] === q.answer ? 1 : 0);
    }, 0);
    setScore(total);
    await saveQuizScore(total);
    Alert.alert('Quiz completed', `You scored ${total}/${QUESTIONS.length}.`);
  };

  const shareScore = async () => {
    try {
      await Share.share({
        message: `I scored ${score}/${QUESTIONS.length} on the Astro-Match Zodiac Quiz. Can you beat me?`,
      });
    } catch (e) {
      // ignore
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: theme.spacing.xl }}>
      <Text style={styles.title}>Zodiac Knowledge Quiz</Text>
      {QUESTIONS.map((item, idx) => (
        <View key={item.q} style={styles.card}>
          <Text style={styles.question}>{idx + 1}. {item.q}</Text>
          <View style={styles.options}>
            {item.options.map((opt) => {
              const active = answers[idx] === opt;
              return (
                <TouchableOpacity
                  key={opt}
                  style={[styles.option, active && styles.optionActive]}
                  onPress={() => selectOption(idx, opt)}
                >
                  <Text style={[styles.optionText, active && styles.optionTextActive]}>{opt}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      ))}

      <PrimaryButton title="Submit" onPress={submit} />
      {score !== null && (
        <View style={styles.resultCard}>
          <Text style={styles.resultText}>Your score: {score}/{QUESTIONS.length}</Text>
          <PrimaryButton title="Share score" onPress={shareScore} />
        </View>
      )}
      <PrimaryButton title="Back" onPress={() => navigation.goBack()} style={{ backgroundColor: theme.colors.cardBackground }} textStyle={{ color: theme.colors.text }} />
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
    title: {
      ...th.textStyles.header,
      marginBottom: th.spacing.medium,
    },
    card: {
      backgroundColor: th.colors.cardBackground,
      borderRadius: th.borderRadius.medium,
      borderWidth: 1,
      borderColor: th.colors.borderColor,
      padding: th.spacing.medium,
      marginBottom: th.spacing.small,
    },
    question: {
      ...th.textStyles.body,
      fontWeight: '700',
      marginBottom: th.spacing.xs,
    },
    options: {
      gap: th.spacing.xs,
    },
    option: {
      paddingVertical: th.spacing.xs,
      paddingHorizontal: th.spacing.sm,
      borderRadius: th.borderRadius.small,
      borderWidth: 1,
      borderColor: th.colors.borderColor,
      backgroundColor: th.colors.cardBackground,
    },
    optionActive: {
      backgroundColor: th.colors.primary,
      borderColor: 'transparent',
    },
    optionText: {
      ...th.textStyles.body,
    },
    optionTextActive: {
      color: '#fff',
      fontWeight: '700',
    },
    resultCard: {
      marginTop: th.spacing.medium,
      padding: th.spacing.medium,
      backgroundColor: th.colors.cardBackground,
      borderRadius: th.borderRadius.medium,
      borderWidth: 1,
      borderColor: th.colors.borderColor,
    },
    resultText: {
      ...th.textStyles.body,
      marginBottom: th.spacing.xs,
      fontWeight: '700',
    },
  });

export default ZodiacQuiz;
