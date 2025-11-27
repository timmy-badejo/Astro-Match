import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

// SignUpScreen component: Collects the user's name and zodiac sign, then navigates to the next screen
const SignUpScreen = ({ navigation }) => {
  // State hooks to manage user name and selected zodiac sign
  const [name, setName] = useState(''); // The state holds the user's name entered in the input field
  const [selectedSign, setSelectedSign] = useState(''); // The state holds the zodiac sign selected by the user

  // Handle sign-up submission: validates input and navigates to the ZodiacSign screen
  const handleSignUp = () => {
    // If the user has entered a name and selected a zodiac sign, proceed
    if (selectedSign && name) {
      // Navigate to the next screen (ZodiacSign) with both name and selectedSign as parameters
      navigation.navigate('ZodiacSign', { name, selectedSign });
    } else {
      // If the form is incomplete, show an alert to inform the user to complete the fields
      alert('Please complete the sign-up form');
    }
  };

  return (
    <View style={styles.container}> {/* Main container for centering content */}
      {/* Header: Welcome message */}
      <Text style={styles.header}>Welcome to AstroMatch!</Text>

      {/* Name input field */}
      <Text style={styles.text}>Enter your name:</Text>
      <TextInput
        style={styles.input} // Style the input field using styles defined
        placeholder="Your Name" // Placeholder text displayed when the input is empty
        value={name} // The input value is bound to the state variable `name`
        onChangeText={(text) => setName(text)} // Updates `name` state on text input
      />

      {/* Zodiac sign selection using a Picker */}
      <Text style={styles.text}>Choose your zodiac sign:</Text>
      <Picker
        selectedValue={selectedSign} // The Picker value is bound to the state variable `selectedSign`
        style={styles.picker} // Picker style is applied here
        onValueChange={(itemValue) => setSelectedSign(itemValue)} // Update `selectedSign` when a zodiac sign is selected
      >
        {/* Default placeholder option */}
        <Picker.Item label="Select a Zodiac Sign" value="" />
        {/* List of zodiac signs in the Picker dropdown */}
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

      {/* Next button to navigate to the next screen */}
      <Button
        title="Next" // Button label displayed on the screen
        onPress={handleSignUp} // Trigger sign-up process when the button is pressed
      />
    </View>
  );
};

// Styles for the SignUpScreen components
const styles = StyleSheet.create({
  container: {
    flex: 1, // Flexbox to take up the full screen height
    justifyContent: 'center', // Centers content vertically within the container
    alignItems: 'center', // Centers content horizontally
    padding: 20, // Padding for the container to prevent content from touching edges
  },
  header: {
    fontSize: 24, // Set font size for header
    fontWeight: 'bold', // Makes the header text bold for emphasis
    marginBottom: 20, // Adds space below the header
  },
  text: {
    fontSize: 18, // Font size for the labels (name and zodiac sign)
    marginVertical: 10, // Adds vertical space around the text
  },
  input: {
    height: 40, // Height of the input field
    borderColor: 'gray', // Border color for the input field
    borderWidth: 1, // Border width for the input field
    marginBottom: 20, // Adds space below the input field
    width: '80%', // Width of the input field as 80% of the container width
    paddingLeft: 8, // Adds left padding inside the input field for better spacing
  },
  picker: {
    height: 50, // Height of the Picker (dropdown)
    width: '80%', // Width of the Picker as 80% of the container width
    marginBottom: 20, // Adds space below the Picker
  },
});

export default SignUpScreen;



