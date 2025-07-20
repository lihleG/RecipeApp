// App.js
import React, { useContext } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { ThemeProvider, ThemeContext } from './ThemeContext';
import HomeScreen from './screens/HomeScreen';
import IngredientSearchScreen from './screens/IngredientSearchScreen';
import DetailScreen from './screens/DetailScreen';
import ShoppingListScreen from './screens/ShoppingListScreen';
import ProfileScreen from './screens/ProfileScreen';

const HomeStack = createNativeStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="IngredientSearch" component={IngredientSearchScreen} options={{ title: 'By Ingredients' }} />
      <HomeStack.Screen name="Details" component={DetailScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="ShoppingList" component={ShoppingListScreen} options={{ title: 'Shopping List' }} />
      <HomeStack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile & Settings' }} />
    </HomeStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function AppContent() {
  const { theme } = useContext(ThemeContext);
  const navTheme = theme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            const iconName = route.name === 'Home' ? 'home-outline' : 'ellipse';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#4ad7ed',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} options={{ title: 'Recipes' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
