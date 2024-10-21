// src/components/Navigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Импортируйте иконки из библиотеки
import StopWatch from './StopWatch';
import Timer from './Timer';

const Tab = createBottomTabNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="StopWatch"
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#212121',
            borderTopWidth: 0,
            elevation: 0,
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: '#b0b0b0',
        }}
      >
        <Tab.Screen 
          name="StopWatch" 
          component={StopWatch} 
          options={{ 
            title: 'Секундомер',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="stopwatch-outline" size={size} color={color} />
            ),
          }} 
        />
        <Tab.Screen 
          name="Timer" 
          component={Timer} 
          options={{ 
            title: 'Таймер',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="timer-outline" size={size} color={color} />
            ),
          }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
