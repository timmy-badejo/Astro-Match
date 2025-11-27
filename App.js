// App.js
import React from 'react';
import { ActivityIndicator, View, Text, StyleSheet, Platform as RNPlatform } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import { Nunito_400Regular, useFonts } from '@expo-google-fonts/nunito';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignUpScreen from './Screens/SignUp';
import ZodiacSignScreen from './Screens/ZodiacSign';
import CompatibilitySearchScreen from './Screens/CompatibilitySearch';
import ResultsScreen from './Screens/Results';
import ProfileScreen from './Screens/Profile';
import FavoritesScreen from './Screens/Favorites';
import theme from './color/style';
                   

const Stack = createNativeStackNavigator();

// (Optional) If you want to keep this for somewhere later
const WebLanding = () => (
  <ThemeProvider theme={theme}>
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to AstroMatch on the Web!</Text>
    </View>
  </ThemeProvider>
);

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  // ❗ We will now let web run the full app (fix for “web-only welcome” issue)
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SignUp"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="ZodiacSign" component={ZodiacSignScreen} />
          <Stack.Screen name="CompatibilitySearch" component={CompatibilitySearchScreen} />
          <Stack.Screen name="Results" component={ResultsScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Favorites" component={FavoritesScreen} />   {/* ✅ new */}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    padding: theme.spacing.medium,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});
