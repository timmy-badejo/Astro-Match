import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import theme from '../color/style';

const ProfileSetupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [about, setAbout] = useState('');
  const [relationshipType, setRelationshipType] = useState('');
  const [otherDetails, setOtherDetails] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!name.trim()) e.name = 'Name required';
    if (!email.trim() || !emailRegex.test(email.trim())) e.email = 'Valid email required';
    if (!dob.trim() || !dobRegex.test(dob.trim())) e.dob = 'Use YYYY-MM-DD';
    if (!gender.trim()) e.gender = 'Gender required';
    if (!relationshipType.trim()) e.relationshipType = 'Tell us your intent';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleCreateProfile = () => {
    if (!validate()) return;
    navigation.replace('MainTabs', { screen: 'Home', params: { name } });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Your Profile</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor={theme.textStyles.subtitle.color}
        value={name}
        onChangeText={setName}
      />
      {errors.name && <Text style={styles.error}>{errors.name}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={theme.textStyles.subtitle.color}
        value={email}
        onChangeText={setEmail}
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Date of birth (YYYY-MM-DD)"
        placeholderTextColor={theme.textStyles.subtitle.color}
        value={dob}
        onChangeText={setDob}
      />
      {errors.dob && <Text style={styles.error}>{errors.dob}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Gender (male / female / non-binary)"
        placeholderTextColor={theme.textStyles.subtitle.color}
        value={gender}
        onChangeText={setGender}
      />
      {errors.gender && <Text style={styles.error}>{errors.gender}</Text>}
      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="About you"
        placeholderTextColor={theme.textStyles.subtitle.color}
        value={about}
        onChangeText={setAbout}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="What are you here for? (dating, friendship, etc.)"
        placeholderTextColor={theme.textStyles.subtitle.color}
        value={relationshipType}
        onChangeText={setRelationshipType}
      />
      {errors.relationshipType && <Text style={styles.error}>{errors.relationshipType}</Text>}
      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Anything specific you're looking for?"
        placeholderTextColor={theme.textStyles.subtitle.color}
        value={otherDetails}
        onChangeText={setOtherDetails}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleCreateProfile}>
        <Text style={styles.buttonText}>Create Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileSetupScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.large,
  },
  title: {
    ...theme.textStyles.header,
    textAlign: 'center',
    marginBottom: theme.spacing.large,
  },
  input: {
    backgroundColor: theme.colors.cardBackground,
    color: theme.colors.text,
    borderRadius: theme.borderRadius.small,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: theme.spacing.small,
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
  },
  multiline: {
    height: 90,
    textAlignVertical: 'top',
  },
  button: {
    marginTop: theme.spacing.medium,
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    borderRadius: theme.borderRadius.medium,
    alignItems: 'center',
    ...theme.shadows.light,
  },
  buttonText: {
    ...theme.textStyles.button,
    color: '#fff',
  },
  error: {
    color: theme.colors.error,
    marginBottom: 6,
  },
});
