// Screens/Profile.js
import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

const ProfileScreen = ({ route }) => {
  const { name = 'Guest', selectedSign = 'Unknown' } = route?.params || {};

  const bio = "Hey, I'm Timmy! I love web development, design, and exploring new tech.";
  const username = 'timmy-bad';
  const birthdate = 'Jan 27, 1999';
  const profileImage = require('../vectors/profileimage.jpg');  // ✅ fixed path

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Profile</Text>
      <Image source={profileImage} style={styles.profileImage} />
      <Text style={styles.text}>Username: {username}</Text>
      <Text style={styles.text}>Name: {name}</Text>
      <Text style={styles.text}>Zodiac Sign: {selectedSign}</Text>
      <Text style={styles.text}>Birthdate: {birthdate}</Text>
      <Text style={styles.bio}>{bio}</Text>
      <Button
        title="Edit Profile"
        onPress={() => alert('Edit Profile functionality is not implemented yet.')}
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