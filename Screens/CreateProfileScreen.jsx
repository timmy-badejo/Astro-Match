import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import theme from '../color/style';

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
    if (!name.trim()) e.name = 'Name is required.';
    if (!email.trim()) e.email = 'Email is required.';
    if (!dob.trim()) e.dob = 'Date of birth is required.';
    if (!gender) e.gender = 'Please select a gender.';
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

  return (
    <View style={styles.container}>
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

      {relationshipType === 'Other' && (
        <InputField
          label="Please specify"
          value={otherType}
          onChangeText={setOtherType}
        />
      )}

      <PrimaryButton title="Continue" onPress={handleContinue} />
    </View>
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
    color: '#fff',
    marginBottom: theme.spacing.medium,
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
    borderColor: '#fff',
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
    color: '#fff',
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 12,
    marginBottom: theme.spacing.small,
  },
});

export default CreateProfileScreen;
