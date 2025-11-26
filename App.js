import React from 'react';
import { ActivityIndicator, Platform, View, Text, StyleSheet } from 'react-native';
import { ThemeProvider } from 'react-native-elements'; // For theming to keep UI consistent
import { Nunito_400Regular, useFonts } from '@expo-google-fonts/nunito'; // Importing the Nunito font from Expo
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from '../screens/SignUpScreen'; // Screen where users input their details
import ZodiacSignScreen from '../screens/ZodiacSignScreen'; // Screen where users select their zodiac sign
import CompatibilitySearchScreen from '../screens/CompatibilitySearchScreen'; // Screen to handle compatibility search
import ResultsScreen from '../screens/ResultsScreen'; // Screen for showing compatibility results
import ProfileScreen from '../screens/ProfileScreen'; // Screen to display user profile
import ZodiacSignList from '../components/ZodiacSignList'; // A component that lists zodiac signs
import theme from '../theme/styletheme'; // Importing custom theme for consistent styling
import { Platform as RNPlatform } from 'react-native'; // Platform module for handling platform-specific UI logic

// Creating the stack navigator object for navigation in v6
const Stack = createNativeStackNavigator(); 

// WebView Component – Displays a welcome message for web platform
const WebView = () => (
  <ThemeProvider theme={theme}> 
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to AstroMatch on the Web!</Text>
    </View>
  </ThemeProvider>
);

export default function App() {
  // Using Expo's hook to load the Nunito font
  let [fontsLoaded] = useFonts({
    Nunito_400Regular, // Ensures the font is loaded before rendering
  });

  // While fonts are loading, show an ActivityIndicator (loading spinner)
  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} /> {/* Showing loading spinner */}
      </View>
    );
  }

  // Conditional rendering based on platform – For web, show the WebView component
  if (RNPlatform.OS === 'web') {
    return <WebView />; // On web platform, display a simple WebView with a welcome message
  }

  // If not on web, render the mobile app screens using Stack Navigator
  return (
    <ThemeProvider theme={theme}> 
      {/* Wrapping the app in the ThemeProvider to apply the theme globally */}
      <NavigationContainer>
        {/* This component handles the navigation for mobile */}
        <Stack.Navigator
          initialRouteName="SignUp" // Starting screen when the app launches
          screenOptions={{
            headerShown: false, // Hide headers to use custom headers if needed
          }}
        >
          {/* Defining screen routes and linking them to respective components */}
          <Stack.Screen name="SignUp" component={SignUpScreen} /> {/* SignUp screen */}
          <Stack.Screen name="ZodiacSign" component={ZodiacSignScreen} /> {/* ZodiacSign screen */}
          <Stack.Screen name="CompatibilitySearch" component={CompatibilitySearchScreen} /> {/* Compatibility search screen */}
          <Stack.Screen name="Results" component={ResultsScreen} /> {/* Results screen based on zodiac compatibility */}
          <Stack.Screen name="Profile" component={ProfileScreen} /> {/* Profile screen to show user details */}
          <Stack.Screen name="ZodiacSignList" component={ZodiacSignList} /> {/* List of zodiac signs for selection */}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

// Styles for WebView and loading screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
    backgroundColor: theme.colors.background, // Apply background color from the theme
    padding: theme.spacing.medium, // Use consistent spacing from theme
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center', // Center the loading spinner
    alignItems: 'center', // Align spinner in the center horizontally
  },
  text: {
    fontSize: 18, // Set text size for the WebView welcome message
  },
});

