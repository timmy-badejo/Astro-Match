import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

// ProfileScreen component: Displays the user's profile details
const ProfileScreen = ({ route, navigation }) => {
  // Destructure the passed data (name and selected zodiac sign) from route params
  const { name, selectedSign } = route.params; // Extract the name and zodiac sign passed from the previous screen

  // Profile data (hardcoded for now)
  const bio = "Hey, I'm Timmy! I love web development, design, and exploring new tech."; // A short bio about the user
  const username = "timmy-bad"; // Hardcoded username, can be dynamic if needed
  const birthdate = "Jan 27, 1999"; // Birthdate information, can be dynamic if available
  const profileImage = require('assets/profileimage.png'); // Path to the profile image from local assets (ensure correct path)

  return (
    <View style={styles.container}> {/* Main container for the profile screen */}
      
      {/* Profile Header */}
      <Text style={styles.header}>Your Profile</Text> {/* The header text that introduces the profile screen */}
      
      {/* Profile Image */}
      <Image source={profileImage} style={styles.profileImage} /> {/* Display the user's profile image */}
      
      {/* Profile Information */}
      <Text style={styles.text}>Username: {username}</Text> {/* Display the username */}
      <Text style={styles.text}>Name: {name}</Text> {/* Display the user's name passed from the previous screen */}
      <Text style={styles.text}>Zodiac Sign: {selectedSign}</Text> {/* Display the selected zodiac sign */}
      <Text style={styles.text}>Birthdate: {birthdate}</Text> {/* Display the user's birthdate */}
      
      {/* Bio Section */}
      <Text style={styles.bio}>{bio}</Text> {/* Display a short bio about the user */}
      
      {/* Button to Edit Profile */}
      <Button
        title="Edit Profile"
        onPress={() => alert('Edit Profile functionality is not implemented yet.')} /* Placeholder action for editing the profile */
      />
    </View>
  );
};

// Styles for the ProfileScreen components
const styles = StyleSheet.create({
  container: {
    flex: 1, // Flexbox for full height container
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    padding: 20, // Padding around the container for spacing
    backgroundColor: '#f9f9f9', // Light background color for the screen
  },
  header: {
    fontSize: 24, // Larger font for the header
    fontWeight: 'bold', // Bold font for emphasis
    marginBottom: 20, // Space below the header
  },
  profileImage: {
    width: 120, // Width of the profile image
    height: 120, // Height of the profile image
    borderRadius: 60, // Circular profile image (half of the width/height)
    marginBottom: 20, // Space below the profile image
  },
  text: {
    fontSize: 18, // Standard font size for profile details
    marginVertical: 10, // Vertical spacing between each text item
  },
  bio: {
    fontSize: 16, // Font size for the bio
    fontStyle: 'italic', // Italic style for the bio to differentiate it
    marginVertical: 15, // Space above and below the bio text
    textAlign: 'center', // Center the bio text horizontally
    color: '#555', // Light gray color for bio text
  },
});

export default ProfileScreen;