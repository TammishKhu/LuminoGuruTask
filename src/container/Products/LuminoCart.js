import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import {useTheme} from '../../Theme/ThemeContext';
import {COMMON_SIZE, STRINGS} from '../../constants';
import {RNLottie, RNText} from '../../Common';
import BackIcon from './Atoms/CartAtoms/BackIcon';
import {useSelector} from 'react-redux';
import CartItems from './Atoms/CartAtoms/CartItems';
import CheckoutSection from './Atoms/CartAtoms/CheckoutSection';
import {screenHeight, screenWidth} from '../../constants/CommonSize';
import emptyCartAnimation from '../../assets/json/emptyCart.json';

const LuminoCart = () => {
  const {COLORS} = useTheme();
  const {availableCount} = useSelector(state => state.productsReducer);
  return (
    <View style={{backgroundColor: COLORS.BG_COLOR, flex: 1}}>
      <SafeAreaView />
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.BG_COLOR} />

      <View style={{marginHorizontal: COMMON_SIZE.COMMON_MARGIN, flex: 1}}>
        {/* ShoppingCart with Back Button */}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 0.2}}>
            <BackIcon />
          </View>
          <View style={{flex: 0.8}}>
            <RNText>
              {STRINGS.ShoppingCart} ({availableCount})
            </RNText>
          </View>
        </View>
        {availableCount > 0 ? (
          <>
            <CartItems />
            <CheckoutSection subtotal={20} delivery={20} total={29} />
          </>
        ) : (
          <View style={styles.emptyCartContainer}>
            <RNText extraLarge ManRopeBold>
              {STRINGS.CartEmpty}
            </RNText>
            <RNLottie
              loop
              source={emptyCartAnimation}
              style={styles.lottieStyle}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default LuminoCart;

const styles = StyleSheet.create({
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieStyle: {
    height: screenHeight * 0.4,
    width: screenWidth * 0.8,
  },
});
