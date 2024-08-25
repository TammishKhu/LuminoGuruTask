import React from 'react';
import {Animated, StyleSheet, TouchableOpacity, View} from 'react-native';
import {scale} from 'react-native-size-matters';
import {RNImage, RNText} from '../../../Common';
import {IMAGES} from '../../../constants';
import {useTheme} from '../../../Theme/ThemeContext';
import {useSelector} from 'react-redux';
import {_onPressNavigate} from '../../../utils/commonFunction';
import {SCREEN_NAMES} from '../../../config';

const CartIconAndCount = React.memo(({opacityInterpolate}) => {
  const {COLORS} = useTheme();
  const scaledSize = scale(19);
  const borderRadius = scaledSize / 2;
  const {availableCount} = useSelector(state => state.productsReducer);
  return (
    <Animated.View style={{opacity: opacityInterpolate}}>
      <TouchableOpacity
        onPress={() => {
          _onPressNavigate(SCREEN_NAMES.LuminoCart);
        }}
        style={styles.container}>
        <RNImage
          source={IMAGES.bag}
          onPress={() => {
            _onPressNavigate(SCREEN_NAMES.LuminoCart);
          }}
        />
        <View
          style={[
            styles.countContainer,
            {
              backgroundColor: COLORS.CART_COUNT_BG,
              height: scaledSize,
              width: scaledSize,
              borderRadius,
            },
          ]}>
          <RNText small textColor={COLORS.PRIMARY_FONT}>
            {availableCount}
          </RNText>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
});

export default CartIconAndCount;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  countContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    bottom: scale(6),
    right: scale(15),
  },
});
