import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import theme from '../color/style';
import { Orbitron_700Bold } from '@expo-google-fonts/orbitron';

const RELATIONSHIP_TYPES = [
  'Romantic relationship',
  'Friendship',
  'Friends with benefits',
  'Networking',
  'Other',
];

const GENDERS = ['Male', 'Female', 'They'];

const CreateProfileScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [about, setAbout] = useState('');
  const [relationshipType, setRelationshipType] = useState('');
  const [otherType, setOtherType] = useState('');
  const [errors, setErrors] = useState({});

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
    if (!relationshipType) e.relationshipType = 'Pick what you are here for.';
    if (relationshipType === 'Other' && !otherType.trim()) {
      e.otherType = 'Tell us more about what you are looking for.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleContinue = () => {
    if (!validate()) return;
    navigation.navigate('ZodiacSign', {
      profile: {
        name: name.trim(),
        email: email.trim(),
        dob: dob.trim(),
        gender,
        about,
        relationshipType: relationshipType === 'Other' ? otherType : relationshipType,
      },
    });
  };

  const canContinue =
    name.trim() &&
    email.trim() &&
    dob.trim() &&
    gender &&
    relationshipType &&
    (relationshipType !== 'Other' || otherType.trim());

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
          onChangeText={setDob}
          error={errors.dob}
        />

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
              relationshipType === type && styles.radioRowSelected,
            ]}
            onPress={() => setRelationshipType(type)}
          >
            <View
              style={[
                styles.radioOuter,
                relationshipType === type && styles.radioOuterSelected,
              ]}
            >
              {relationshipType === type && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.radioLabel}>{type}</Text>
          </TouchableOpacity>
        ))}
        {errors.relationshipType && <Text style={styles.errorText}>{errors.relationshipType}</Text>}

        {relationshipType === 'Other' && (
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
