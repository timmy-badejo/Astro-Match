import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import theme from '../color/style';
import { Orbitron_700Bold } from '@expo-google-fonts/orbitron';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { zodiacSigns } from '../data/zodiacData';

const RELATIONSHIP_TYPES = [
  'Romantic relationship',
  'Friendship',
  'Friends with benefits',
  'Networking',
  'Other',
];

const GENDERS = ['Male', 'Female', 'They'];

const CreateProfileScreen = ({ navigation, route }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [about, setAbout] = useState('');
  const [relationshipType, setRelationshipType] = useState([]);
  const [otherType, setOtherType] = useState('');
  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [initialLoaded, setInitialLoaded] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      const stored = await AsyncStorage.getItem('@astromatch:profile');
      if (stored) {
        const parsed = JSON.parse(stored);
        setName(parsed.name || '');
        setEmail(parsed.email || '');
        setDob(parsed.dob || '');
        setGender(parsed.gender || '');
        setAbout(parsed.about || '');
        setRelationshipType(parsed.relationshipType ? [].concat(parsed.relationshipType) : []);
        setOtherType(parsed.relationshipTypeOther || '');
      }
      setInitialLoaded(true);
    };
    loadProfile();
  }, []);

  useEffect(() => {
    if (route?.params?.profile) {
      const p = route.params.profile;
      setName(p.name || '');
      setEmail(p.email || '');
      setDob(p.dob || '');
      setGender(p.gender || '');
      setAbout(p.about || '');
      setRelationshipType(p.relationshipType ? [].concat(p.relationshipType) : []);
      setOtherType(p.relationshipTypeOther || '');
    }
  }, [route?.params?.profile]);

  const toggleRelationshipType = (type) => {
    setRelationshipType((prev) => {
      const exists = prev.includes(type);
      if (exists) return prev.filter((t) => t !== type);
      if (prev.length >= 2) return prev; // limit to 2
      return [...prev, type];
    });
  };

  const validate = () => {
    const e = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const dobRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!name.trim()) e.name = 'Name is required.';
    if (!email.trim()) e.email = 'Email is required.';
    else if (!emailRegex.test(email.trim())) e.email = 'Enter a valid email.';
    if (!dob.trim()) e.dob = 'Date of birth is required.';
    else if (!dobRegex.test(dob.trim())) e.dob = 'Use YYYY-MM-DD format.';
    if (!gender) e.gender = 'Please select a gender.';
    if (!relationshipType.length) e.relationshipType = 'Pick what you are here for (max 2).';
    if (relationshipType.includes('Other') && !otherType.trim()) {
      e.otherType = 'Tell us more about what you are looking for.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const getZodiacFromDob = (dateString) => {
    const date = new Date(dateString);
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const ranges = [
      { sign: 'Capricorn', start: [12, 22], end: [1, 19] },
      { sign: 'Aquarius', start: [1, 20], end: [2, 18] },
      { sign: 'Pisces', start: [2, 19], end: [3, 20] },
      { sign: 'Aries', start: [3, 21], end: [4, 19] },
      { sign: 'Taurus', start: [4, 20], end: [5, 20] },
      { sign: 'Gemini', start: [5, 21], end: [6, 20] },
      { sign: 'Cancer', start: [6, 21], end: [7, 22] },
      { sign: 'Leo', start: [7, 23], end: [8, 22] },
      { sign: 'Virgo', start: [8, 23], end: [9, 22] },
      { sign: 'Libra', start: [9, 23], end: [10, 22] },
      { sign: 'Scorpio', start: [10, 23], end: [11, 21] },
      { sign: 'Sagittarius', start: [11, 22], end: [12, 21] },
    ];
    const inRange = (m, d, start, end) => {
      const [sm, sd] = start;
      const [em, ed] = end;
      if (sm === 12 && em === 1) {
        return (m === 12 && d >= sd) || (m === 1 && d <= ed);
      }
      if (m === sm && d >= sd) return true;
      if (m === em && d <= ed) return true;
      if (m > sm && m < em) return true;
      return false;
    };
    const found = ranges.find((r) => inRange(month, day, r.start, r.end));
    return found?.sign || '';
  };

  const handleContinue = () => {
    if (!validate()) return;
    const autoSignName = getZodiacFromDob(dob.trim());
    const signData = zodiacSigns.find((z) => z.name === autoSignName) || null;
    const profilePayload = {
      name: name.trim(),
      email: email.trim(),
      dob: dob.trim(),
      gender,
      about,
      relationshipType,
      relationshipTypeOther: otherType,
      autoSign: autoSignName,
    };
    AsyncStorage.setItem('@astromatch:profile', JSON.stringify(profilePayload));
    navigation.navigate('ZodiacSign', {
      profile: profilePayload,
      preselectedSign: signData,
    });
  };

  const canContinue =
    name.trim() &&
    email.trim() &&
    dob.trim() &&
    gender &&
    relationshipType.length &&
    (!relationshipType.includes('Other') || otherType.trim());

  const onDateChange = (_, selected) => {
    setShowDatePicker(false);
    if (selected) {
      const iso = selected.toISOString().split('T')[0];
      setDob(iso);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Welcome to AstroMatch</Text>

        <InputField
          label="Name"
          value={name}
          onChangeText={setName}
          error={errors.name}
        />
        <InputField
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
        />
        <InputField
          label="Date of Birth"
          placeholder="YYYY-MM-DD"
          value={dob}
          onFocus={() => setShowDatePicker(true)}
          editable={false}
          error={errors.dob}
        />
        {showDatePicker && (
          <DateTimePicker
            value={dob ? new Date(dob) : new Date()}
            mode="date"
            display="spinner"
            maximumDate={new Date()}
            onChange={onDateChange}
          />
        )}

        <Text style={styles.sectionLabel}>Gender</Text>
        <View style={styles.chipRow}>
          {GENDERS.map((g) => (
            <TouchableOpacity
              key={g}
              style={[
                styles.chip,
                gender === g && styles.chipSelected,
              ]}
              onPress={() => setGender(g)}
            >
              <Text
                style={[
                  styles.chipText,
                  gender === g && styles.chipTextSelected,
                ]}
              >
                {g}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}

        <InputField
          label="About you"
          multiline
          value={about}
          onChangeText={setAbout}
        />

        <Text style={styles.sectionLabel}>What are you here for?</Text>
        {RELATIONSHIP_TYPES.map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.radioRow,
              relationshipType.includes(type) && styles.radioRowSelected,
            ]}
            onPress={() => toggleRelationshipType(type)}
          >
            <View
              style={[
                styles.radioOuter,
                relationshipType.includes(type) && styles.radioOuterSelected,
              ]}
            >
              {relationshipType.includes(type) && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.radioLabel}>{type}</Text>
          </TouchableOpacity>
        ))}
        {errors.relationshipType && <Text style={styles.errorText}>{errors.relationshipType}</Text>}

        {relationshipType.includes('Other') && (
          <InputField
            label="Please specify"
            value={otherType}
            onChangeText={setOtherType}
            error={errors.otherType}
          />
        )}

        <View style={styles.buttonSpacer} />
      </ScrollView>
      <View style={styles.footer}>
        <PrimaryButton
          title="Complete profile"
          onPress={handleContinue}
          disabled={!canContinue}
          style={{ width: '100%' }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.large,
    backgroundColor: '#060B3A',
  },
  title: {
    ...theme.textStyles.header,
    color: '#f4f4f4',
    marginBottom: theme.spacing.medium,
    letterSpacing: 1,
    textShadowColor: 'rgba(90,61,255,0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    fontFamily: 'Orbitron_700Bold',
  },
  sectionLabel: {
    ...theme.textStyles.subtitle,
    color: '#fff',
    marginBottom: 4,
  },
  chipRow: {
    flexDirection: 'row',
    marginBottom: theme.spacing.small,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: theme.borderRadius.large,
    borderWidth: 1,
    borderColor: '#fff',
    marginRight: 8,
  },
  chipSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  chipText: {
    color: '#fff',
  },
  chipTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  radioRowSelected: {},
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#060B3A',
    marginRight: 8,
  },
  radioOuterSelected: {
    borderColor: theme.colors.primary,
  },
  radioInner: {
    flex: 1,
    margin: 3,
    borderRadius: 9,
    backgroundColor: theme.colors.primary,
  },
  radioLabel: {
    ...theme.textStyles.body,
    color: '#060B3A',
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 12,
    marginBottom: theme.spacing.small,
  },
  buttonSpacer: {
    height: 80,
    backgroundColor: '#060B3A',
    
  },
  footer: {
    padding: theme.spacing.large,
    backgroundColor: 'rgba(2,10,48,0.9)',
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderColor,
  },
});

export default CreateProfileScreen;
