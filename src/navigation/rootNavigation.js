import React, {useEffect, useState} from 'react';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREEN_NAMES} from '../config';
import ProductsNavigation from './ProductsNavigation';
import {useTheme} from '../Theme/ThemeContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import {store} from '../redux/Store';

const Stack = createNativeStackNavigator();
export const navigationRef = createNavigationContainerRef();
console.log(store.getState(), 'AllSttae');

const RootNavigation = () => {
  const {COLORS} = useTheme();

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName={'ProductsNavigation'}
          screenOptions={{
            headerShown: false,
            navigationBarColor: COLORS.BG_COLOR,
          }}>
          <Stack.Screen
            name={SCREEN_NAMES.ProductsNavigation}
            component={ProductsNavigation}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default RootNavigation;
