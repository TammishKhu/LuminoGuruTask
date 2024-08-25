import {LayoutAnimation, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {scale} from 'react-native-size-matters';
import {RNImage, RNText} from '../../../../Common';
import RNTextScrollable from '../../../../Common/TextScrollable/TextScrollable';
import PlusMinusButton from '../PlusMinusButton';
import {useTheme} from '../../../../Theme/ThemeContext';
import {useDispatch} from 'react-redux';
import {addCartItemRequest, removeCartItemRequest} from '../../module/action';
import {CONSTANT} from '../../../../config';

const EachCartItem = ({product}) => {
  const {COLORS} = useTheme();
  const dispatch = useDispatch();
  const handleAddItem = product => () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    let body = {
      product,
    };
    dispatch(addCartItemRequest({body}));
  };

  const handleRemoveItem = product => () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    let body = {
      product,
    };
    dispatch(removeCartItemRequest({body, screen: CONSTANT.CART}));
  };
  return (
    <View
      key={product.id}
      style={[
        styles.itemContainer,
        {
          borderColor: COLORS.TEXT_COLOR_F,
        },
      ]}>
      <View style={styles.leftContainer}>
        <View style={styles.imageContainer}>
          <RNImage source={{uri: product.thumbnail}} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <RNTextScrollable ManropeSemiBold extraSmall>
            {product.title}
          </RNTextScrollable>
          <RNText extraSmall>${product.price}</RNText>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.buttonContainer}>
          <PlusMinusButton
            type={'minus'}
            backgroundColor={COLORS.BG_LIGHT_COLOR}
            size={scale(30)}
            iconColor={COLORS.BLACK}
            onPress={handleRemoveItem(product)}
          />
        </View>
        <View style={styles.quantityContainer}>
          <RNText extraSmall ManRopeBold>
            {product.quantity}
          </RNText>
        </View>
        <View style={styles.buttonContainer}>
          <PlusMinusButton
            type={'plus'}
            backgroundColor={COLORS.BG_LIGHT_COLOR}
            size={scale(30)}
            iconColor={COLORS.BLACK}
            onPress={handleAddItem(product)}
          />
        </View>
      </View>
    </View>
  );
};

export default EachCartItem;

const styles = StyleSheet.create({
  itemContainer: {
    borderBottomWidth: 1,
    paddingVertical: scale(10),
    flexDirection: 'row',
  },
  leftContainer: {
    flex: 0.65,
    flexDirection: 'row',
  },
  imageContainer: {
    flex: 0.3,
    justifyContent: 'center',
  },
  image: {
    width: scale(30),
    height: scale(30),
  },
  textContainer: {
    flex: 0.7,
  },
  rightContainer: {
    flex: 0.35,
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
