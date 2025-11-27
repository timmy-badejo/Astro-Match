import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Animated } from 'react-native';
import ZodiacSignList from '../components/ZodiacSignList'; // Importing the component for listing zodiac signs
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions'; // Handles responsiveness across screen sizes
import theme from '../color/style'; // Global theme for consistent styling


// ZodiacSignScreen component: Displays zodiac signs and allows user selection
const ZodiacSignScreen = ({ navigation }) => {
  const [selectedSign, setSelectedSign] = useState(null); // State to hold the selected zodiac sign
  const [fadeAnim] = useState(new Animated.Value(0)); // Animated value for fade-in effect when a sign is selected

  // Handle zodiac sign selection: set state and navigate to next screen with selected sign
  const handleSignSelection = (sign) => {
    setSelectedSign(sign); // Update selected sign in state
    navigation.navigate('CompatibilitySearch', { selectedSign: sign.name }); // Navigate to CompatibilitySearch screen with selected sign

    // Start the fade-in animation for the selected zodiac sign
    Animated.timing(fadeAnim, {
      toValue: 1, // Make the text fade in
      duration: 500, // 500ms for smooth fade-in
      useNativeDriver: true, // Use native driver for performance
    }).start(); // Execute the animation
  };

  return (
    <View style={styles.container}> {/* Main container that centers content */}
      
      <Image
        source={require('../vectors/AstorMatchlogo.png')} // Logo image
        style={styles.logo} // Styling for the logo
        accessibilityLabel="AstorMatchlogo" // For screen readers
      />
      
      <Text style={styles.header}>Choose Your Zodiac Sign</Text> {/* Header text for the screen */}
      
      <ZodiacSignList onSelectSign={handleSignSelection} /> {/* List of zodiac signs passed to the component */}

      <TouchableOpacity
        style={[
          styles.button, 
          { backgroundColor: selectedSign ? theme.colors.primary : theme.colors.secondary }, // Change button color based on selection
          { opacity: selectedSign ? 1 : 0.5 }, // Adjust opacity based on button state
        ]}
        onPress={() => navigation.navigate('CompatibilitySearch', { selectedSign })} // Navigate to CompatibilitySearch screen
        disabled={!selectedSign} // Disable button if no zodiac sign is selected
        accessibilityLabel="Next Button" // Accessibility label for button
      >
        <Text style={styles.buttonText}>Next</Text> {/* Button text */}
      </TouchableOpacity>

      {/* Display selected zodiac sign with fade-in animation */}
      <Animated.View style={[styles.displayContainer, { opacity: fadeAnim }]}>
        <Text style={styles.displayText}>
          {selectedSign ? `You selected: ${selectedSign.name}` : 'Please select a zodiac sign'}
        </Text>
      </Animated.View>
    </View>
  );
};

// Styles using responsive design and global theme
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center', // Center content horizontally
    padding: responsiveWidth(5), // Adjust padding for responsiveness
    backgroundColor: theme.colors.background, // Background color from the theme
  },
  logo: {
    width: responsiveWidth(40), // Responsive logo size
    height: responsiveWidth(40), // Maintaining aspect ratio for the logo
    marginBottom: responsiveHeight(3), // Margin below logo
  },
  header: {
    ...theme.textStyles.header, // Applying header style from the global theme
    marginBottom: responsiveHeight(3), // Add margin below header
    color: theme.colors.text, // Ensure the header text color matches the theme
  },
  button: {
    width: responsiveWidth(80), // Button width (responsive)
    height: responsiveHeight(7), // Button height (responsive)
    justifyContent: 'center', // Center button text vertically
    alignItems: 'center', // Center button text horizontally
    borderRadius: theme.borderRadius.medium, // Rounded corners for the button
    marginVertical: responsiveHeight(2), // Add space between the button and content
  },
  buttonText: {
    color: '#fff', // White text for the button
    fontSize: theme.textStyles.button.fontSize, // Font size from the theme
    fontFamily: theme.textStyles.button.fontFamily, // Font family from the theme
    fontWeight: 'bold', // Bold text for emphasis
  },
  displayContainer: {
    marginTop: responsiveHeight(3), // Margin from other elements
    justifyContent: 'center',
    alignItems: 'center',
  },
  displayText: {
    fontSize: 18, // Font size for the display text
    color: theme.colors.text, // Text color from theme for consistency
  },
});

export default ZodiacSignScreen;

