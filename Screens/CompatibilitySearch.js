import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';


// CompatibilitySearchScreen component: Displays compatibility information for the selected zodiac sign
const CompatibilitySearchScreen = ({ route, navigation }) => {
  // Retrieve the selected zodiac sign passed from ZodiacSignScreen
  const { selectedSign } = route.params;  // Destructuring the selected zodiac sign from route.params

  // This is where you would add your logic for compatibility search based on the zodiac sign
  // Currently, it only displays the selected zodiac sign, but it can be expanded with additional features later.

  return (
    <View style={styles.container}>
      {/* Display the zodiac sign being searched for */}
      <Text style={styles.header}>
        Searching compatibility for zodiac sign {selectedSign}
      </Text>
      
      {/* Placeholder text for compatibility search */}
      <Text style={styles.text}>
        Here will be the compatibility results between {selectedSign} and other signs.
      </Text>

      {/* Button to navigate to the results screen */}
      <Button 
        title="See Results" // Button title
        onPress={() => navigation.navigate('Results', { selectedSign })} // Navigate to the Results screen and pass the selectedSign as a parameter
      />
    </View>
  );
};

// Styles for the CompatibilitySearchScreen
const styles = StyleSheet.create({
  container: {
    flex: 1, // Full screen height, allowing the content to fill the available space
    justifyContent: 'center', // Center content vertically within the container
    alignItems: 'center', // Center content horizontally within the container
    padding: 20, // Padding inside the container to provide space around the content
    backgroundColor: theme.colors.background, // Set background color from the global theme for consistent design
  },
  header: {
    fontSize: 24, // Font size for the header text
    fontWeight: 'bold', // Bold font style for emphasis
    marginBottom: 20, // Space below the header to separate it from the next section
    color: theme.colors.text, // Text color sourced from the theme for consistency
  },
  text: {
    fontSize: 18, // Font size for the regular text
    marginBottom: 20, // Space below the text to separate it from the button
    color: theme.colors.text, // Text color sourced from the theme for consistency
    textAlign: 'center', // Center-align the text to ensure it looks good on all screen sizes
  },
});

export default CompatibilitySearchScreen;


