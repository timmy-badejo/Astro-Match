import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';   // ✅ new import

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
      <Picker
        selectedValue={selectedSign}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedSign(itemValue)}
      >
        <Picker.Item label="Select a Zodiac Sign" value="" />
        <Picker.Item label="Aries" value="Aries" />
        <Picker.Item label="Taurus" value="Taurus" />
        <Picker.Item label="Gemini" value="Gemini" />
        <Picker.Item label="Cancer" value="Cancer" />
        <Picker.Item label="Leo" value="Leo" />
        <Picker.Item label="Virgo" value="Virgo" />
        <Picker.Item label="Libra" value="Libra" />
        <Picker.Item label="Scorpio" value="Scorpio" />
        <Picker.Item label="Sagittarius" value="Sagittarius" />
        <Picker.Item label="Capricorn" value="Capricorn" />
        <Picker.Item label="Aquarius" value="Aquarius" />
        <Picker.Item label="Pisces" value="Pisces" />
      </Picker>

      <Button title="Next" onPress={handleSignUp} />
    </View>
  );
};

export default SignUpScreen;



