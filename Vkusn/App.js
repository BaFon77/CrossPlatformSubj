import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, Image, StatusBar, ScrollView } from 'react-native';
import Header from './src/components/Header';
import Categories from './src/components/Categories';
import Popular from './src/components/Popular';
import { COLORS } from './constants';

const Tab = createBottomTabNavigator();

const HomeScreen = () => (
  <View style={styles.screenContainer}>
    <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
    <Header />
    <ScrollView>
      <Categories />
      <Popular />
    </ScrollView>
  </View>
);

const PromotionsScreen = () => (
  <View style={styles.screenContainer}>
    <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
    <Header />
    <ScrollView>
      <Text style={styles.screenText}>Здесь будут Акции</Text>
    </ScrollView>
  </View>
);

const OrderScreen = () => (
  <View style={styles.screenContainer}>
    <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
    <Header />
    <ScrollView>
      <Text style={styles.screenText}>Здесь можно оформить Заказ</Text>
    </ScrollView>
  </View>
);

const MapScreen = () => (
  <View style={styles.screenContainer}>
    <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
    <Header />
    <ScrollView>
      <Text style={styles.screenText}>Здесь будет Карта</Text>
    </ScrollView>
  </View>
);

const MoreScreen = () => (
  <View style={styles.screenContainer}>
    <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
    <Header />
    <ScrollView>
      <Text style={styles.screenText}>Ещё информация</Text>
    </ScrollView>
  </View>
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: {
            height: 70,
            position: 'absolute',
            bottom: 5,
            left: 10,
            right: 10,
            backgroundColor: COLORS.black,
            elevation: 10,
          },
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.white,
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            let iconName;

            switch (route.name) {
              case 'Начало':
                iconName = require('./assets/first.png');
                break;
              case 'Акции':
                iconName = require('./assets/second.png');
                break;
              case 'Заказ':
                iconName = require('./assets/third.png');
                break;
              case 'Карта':
                iconName = require('./assets/fourth.png');
                break;
              case 'Ещё':
                iconName = require('./assets/fifth.png');
                break;
              default:
                iconName = require('./assets/first.png');
                break;
            }

            return (
              <Image
                source={iconName}
                style={[styles.icon, focused && styles.activeIcon]}
              />
            );
          },
        })}>
        <Tab.Screen name="Начало" component={HomeScreen} />
        <Tab.Screen name="Акции" component={PromotionsScreen} />
        <Tab.Screen name="Заказ" component={OrderScreen} />
        <Tab.Screen name="Карта" component={MapScreen} />
        <Tab.Screen name="Ещё" component={MoreScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 24,
    paddingTop: 40,
    backgroundColor: COLORS.black,
  },
  screenText: {
    color: COLORS.white,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10
  },
  icon: {
    width: 25,
    height: 25,
    tintColor: COLORS.white,
    marginTop: 5,
  },
  activeIcon: {
    tintColor: COLORS.primary,
  },
});
