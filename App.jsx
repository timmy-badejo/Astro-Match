// App.js
import React from 'react';
import { ActivityIndicator, View, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import { Nunito_400Regular, useFonts } from '@expo-google-fonts/nunito';
import { Orbitron_700Bold } from '@expo-google-fonts/orbitron';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import SplashScreen from './Screens/SplashScreen';
import OnboardingScreen from './Screens/OnboardingScreen';
import CreateProfileScreen from './Screens/CreateProfileScreen';
import SignInScreen from './Screens/SignInScreen';
import HomeScreen from './Screens/HomeScreen';
import ZodiacSignScreen from './Screens/ZodiacSign';
import CompatibilitySearchScreen from './Screens/CompatibilitySearch';
import ResultsScreen from './Screens/Results';
import ProfileScreen from './Screens/Profile';
import FavoritesScreen from './Screens/Favorites';
import MessagesScreen from './Screens/Messages';
import SettingsScreen from './Screens/Settings';
import ChatThread from './Screens/ChatThread';
import theme from './color/style';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route, navigation }) => ({
      headerShown: true,
      tabBarActiveTintColor: theme.colors.primary,
      tabBarInactiveTintColor: '#93A0C1',
      tabBarStyle: { backgroundColor: theme.colors.cardBackground },
      headerStyle: { backgroundColor: theme.colors.background },
      headerTitleStyle: { color: theme.colors.text },
      headerTintColor: theme.colors.text,
      headerLeft: route.name !== 'Home'
        ? () => (
          <TouchableOpacity
            style={{ paddingHorizontal: theme.spacing.small }}
            onPress={() => navigation.navigate('Home')}
          >
            <Ionicons name="arrow-back" size={22} color={theme.colors.text} />
          </TouchableOpacity>
        )
        : undefined,
      tabBarIcon: ({ color, size }) => {
        const icons = {
          Home: 'home',
          Favorites: 'heart',
          Messages: 'chatbubbles',
          Profile: 'person-circle',
          Settings: 'settings',
        };
        return <Ionicons name={icons[route.name] || 'ellipse'} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Favorites" component={FavoritesScreen} />
    <Tab.Screen name="Messages" component={MessagesScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
);

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Orbitron_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: true,
            headerStyle: { backgroundColor: theme.colors.background },
            headerTitleStyle: { color: theme.colors.text },
            headerTintColor: theme.colors.text,
          }}
        >
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreateProfile"
            component={CreateProfileScreen}
            options={{ title: 'Create Profile' }}
          />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen
            name="ZodiacSign"
            component={ZodiacSignScreen}
            options={{ title: 'Pick your sign' }}
          />
          <Stack.Screen
            name="CompatibilitySearch"
            component={CompatibilitySearchScreen}
            options={{ title: 'Compatibility search' }}
          />
          <Stack.Screen
            name="Results"
            component={ResultsScreen}
            options={{ title: 'Results' }}
          />
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ChatThread"
            component={ChatThread}
            options={{ title: 'Chat' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
});
