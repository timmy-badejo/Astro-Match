// App.js
import React from 'react';
import { ActivityIndicator, View, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemeProvider as ElementsThemeProvider } from 'react-native-elements';
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
import CompatibleUsers from './Screens/CompatibleUsers';
import UserProfile from './Screens/UserProfile';
import theme from './color/style';
import { ThemeProvider, useAppTheme } from './context/ThemeContext';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  const { theme: currentTheme } = useAppTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        headerShown: true,
        tabBarActiveTintColor: currentTheme.colors.primary,
        tabBarInactiveTintColor: currentTheme.textStyles.subtitle.color,
        tabBarStyle: { backgroundColor: currentTheme.colors.cardBackground },
        headerStyle: { backgroundColor: currentTheme.colors.background },
        headerTitleStyle: { color: currentTheme.colors.text },
        headerTintColor: currentTheme.colors.text,
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
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Orbitron_700Bold,
  });

  return (
    <ThemeProvider>
      <ThemedApp fontsLoaded={fontsLoaded} />
    </ThemeProvider>
  );
}

const ThemedApp = ({ fontsLoaded }) => {
  const { theme: currentTheme, navTheme } = useAppTheme();

  if (!fontsLoaded) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: currentTheme.colors.background }]}>
        <ActivityIndicator size="large" color={currentTheme.colors.primary} />
      </View>
    );
  }

  return (
    <ElementsThemeProvider theme={currentTheme}>
      <NavigationContainer theme={navTheme}>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: true,
            headerStyle: { backgroundColor: currentTheme.colors.background },
            headerTitleStyle: { color: currentTheme.colors.text },
            headerTintColor: currentTheme.colors.text,
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
          <Stack.Screen
            name="CompatibleUsers"
            component={CompatibleUsers}
            options={{ title: 'Compatible users' }}
          />
          <Stack.Screen
            name="UserProfile"
            component={UserProfile}
            options={{ title: 'Profile' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ElementsThemeProvider>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
});
