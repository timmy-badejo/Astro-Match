import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { zodiacSigns } from '../data/zodiacData'; // Import zodiac sign data from the data folder

// ResultsScreen component: Displays compatibility results and insights based on the selected zodiac sign
const ResultsScreen = ({ route, navigation }) => {
  // Destructure selectedSign from the route parameters (passed from the previous screen)
  const { selectedSign } = route.params; // Grabbing the `selectedSign` from the navigation params

  // Find the details of the selected zodiac sign from the zodiacSigns array
  const selectedSignDetails = zodiacSigns.find((sign) => sign.name === selectedSign); // Search for the selected sign in the zodiacSigns data array
  
  // Get the list of compatible zodiac signs for the selected sign (if available)
  const compatibleSigns = selectedSignDetails ? selectedSignDetails.compatibleSigns : []; // If the selected sign exists, get its compatible signs

  return (
    <View style={styles.container}> {/* Main container to center the content */}
      {/* Header text displaying selected zodiac sign */}
      <Text style={styles.header}>Compatibility Results for {selectedSign}</Text> {/* Display the selected zodiac sign in the header */}

      {/* Subheader for compatible signs */}
      <Text style={styles.subHeader}>Compatible Signs:</Text> {/* Label for compatible signs section */}
      
      {/* Display the compatible signs */}
      {compatibleSigns.length > 0 ? (
        compatibleSigns.map((sign, index) => (
          <Text key={index} style={styles.text}>{sign}</Text> // Loop through compatible signs and display them
        ))
      ) : (
        <Text style={styles.text}>No compatibility data available.</Text> // If no compatible signs are found, show a fallback message
      )}

      {/* Subheader for compatibility insights */}
      <Text style={styles.subHeader}>Compatibility Insights:</Text> {/* Label for compatibility insights section */}
      
      {/* Provide specific insights based on the selected zodiac sign */}
      <Text style={styles.text}>
        {selectedSign === 'Aries' ? 'Aries is bold and fiery...' : 'Each sign has unique compatibility traits.'} {/* Display custom insights for Aries or a general message */}
      </Text>

      {/* Button to navigate to the Profile screen */}
      <Button 
        title="View Profile" 
        onPress={() => navigation.navigate('Profile')} // Navigate to the Profile screen when the button is pressed
      />
    </View>
  );
};

// Styles for the ResultsScreen
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    padding: 20, // Padding around the content
    backgroundColor: '#f9f9f9', // Light background color for the screen
  },
  header: {
    fontSize: 24, // Larger font size for the header
    fontWeight: 'bold', // Bold font for the header
    marginBottom: 20, // Space below the header
  },
  subHeader: {
    fontSize: 18, // Font size for the subheaders (e.g., "Compatible Signs")
    fontWeight: 'bold', // Bold font for subheaders to make them stand out
    marginVertical: 10, // Vertical spacing around subheaders
  },
  text: {
    fontSize: 16, // Standard font size for text
    marginVertical: 5, // Space between each piece of text
  },
});

export default ResultsScreen;


