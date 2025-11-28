// Screens/SignUp.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const ZODIAC_OPTIONS = [
  'Aries','Taurus','Gemini','Cancer','Leo','Virgo',
  'Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces',
];

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [selectedSign, setSelectedSign] = useState('');

  const handleSignUp = () => {
    const trimmedName = name.trim();

    if (!trimmedName && !selectedSign) {
      alert('Please enter your name and select your zodiac sign.');
      return;
    }
    if (!trimmedName) {
      alert('Please enter your name.');
      return;
    }
    if (!selectedSign) {
      alert('Please select your zodiac sign.');
      return;
    }

    navigation.navigate('ZodiacSign', { name: trimmedName, selectedSign });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to AstroMatch!</Text>

      <Text style={styles.text}>Enter your name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.text}>Choose your zodiac sign:</Text>
      <ScrollView
        contentContainerStyle={styles.signsContainer}
        showsVerticalScrollIndicator={false}
      >
        {ZODIAC_OPTIONS.map((sign) => {
          const isSelected = sign === selectedSign;
          return (
            <TouchableOpacity
              key={sign}
              style={[styles.signChip, isSelected && styles.signChipSelected]}
              onPress={() => setSelectedSign(sign)}
            >
              <Text style={[styles.signChipText, isSelected && styles.signChipTextSelected]}>
                {sign}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <Button title="Next" onPress={handleSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    width: '80%',
    paddingLeft: 8,
  },
  signsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  signChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#3498db',
    margin: 4,
  },
  signChipSelected: {
    backgroundColor: '#3498db',
  },
  signChipText: {
    fontSize: 14,
    color: '#3498db',
  },
  signChipTextSelected: {
    color: '#fff',
  },
});

export default SignUpScreen;
