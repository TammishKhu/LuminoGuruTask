import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREEN_NAMES} from '../config';
// import Products from '../container/Products/Products';
import Products from '../container/Products/ProductsWithoutInterpolation';
import LuminoCart from '../container/Products/LuminoCart';

const Stack = createNativeStackNavigator();
const defaultOptions = {
  headerShown: false,
  animation: 'fade',
};
const ProductsNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={defaultOptions}
      initialRouteName={SCREEN_NAMES.OnBoarding}>
      <Stack.Screen
        options={defaultOptions}
        name={SCREEN_NAMES.Products}
        component={Products}
      />
      <Stack.Screen
        options={defaultOptions}
        name={SCREEN_NAMES.LuminoCart}
        component={LuminoCart}
      />
    </Stack.Navigator>
  );
};
export default ProductsNavigation;
