import React from 'react';
import { FlatList, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { zodiacSigns } from '../data/zodiacData'; // Import the list of zodiac signs from the data folder

// ZodiacSignList component: Displays a list of zodiac signs with their names and images.
const ZodiacSignList = ({ onSelectSign }) => {
  // Render each item in the list
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer} // Apply styling to the container
      onPress={() => onSelectSign(item)} // Trigger the onSelectSign function when the item is selected
    >
      {/* Display the zodiac sign image */}
      <Image source={item.image} style={styles.itemImage} />
      {/* Display the zodiac sign name */}
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={zodiacSigns} // The data to display in the list (list of zodiac signs)
      renderItem={renderItem} // Render each item using the renderItem function
      keyExtractor={(item) => item.id.toString()} // Ensure each item has a unique key based on its id
    />
  );
};

// Styles for the ZodiacSignList component
const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row', // Align image and text horizontally
    padding: 10, // Padding around the items
    marginVertical: 5, // Vertical margin between items
    backgroundColor: '#1054BD', // Background color for each item
    borderRadius: 5, // Rounded corners for the item
    alignItems: 'center', // Vertically center content within each item
  },
  itemImage: {
    width: 50, // Width of the zodiac sign image
    height: 50, // Height of the zodiac sign image
    marginRight: 10, // Space between image and text
  },
  itemText: {
    color: 'white', // White text color to contrast with the background
    fontSize: 18, // Font size for the zodiac sign name
  },
});

export default ZodiacSignList;

