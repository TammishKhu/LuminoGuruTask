import React from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import {RNImage, RNText} from '../../../Common';
import {scale} from 'react-native-size-matters';
import RNTextScrollable from '../../../Common/TextScrollable/TextScrollable';
import PlusMinusButton from './PlusMinusButton';
import {COMMON_SIZE, IMAGES} from '../../../constants';
import {screenHeight} from '../../../constants/CommonSize';
import {useTheme} from '../../../Theme/ThemeContext';
import useBounceAnimation from '../Animations/useBounceAnimation';

const ProductItem = ({
  product,
  handleFavourite,
  handleAddItem,
  handleRemoveItem,
}) => {
  const {COLORS} = useTheme();
  let eachQuantity = product.quantity;
  let isFavMarked = product.isFavMarked;

  const {bounceValue, bounceAnimation, rotateInterpolate} =
    useBounceAnimation();

  return (
    <View style={[styles.item, {backgroundColor: COLORS.BG_LIGHT_COLOR}]}>
      <Animated.View
        style={{
          transform: [{scale: bounceValue}, {rotate: rotateInterpolate}],
        }}>
        <RNImage
          source={isFavMarked ? IMAGES.heart : IMAGES.heartUnfilled}
          style={styles.heartImage}
          onPress={() => {
            bounceAnimation();
            handleFavourite(product)();
          }}
        />
      </Animated.View>
      <RNImage source={{uri: product.thumbnail}} style={styles.productImage} />
      <View style={styles.productInfoContainer}>
        <RNText style={[styles.productPrice, {color: COLORS.TEXT_COLOR_B}]}>
          ${product.price.toFixed(2)}
        </RNText>
        <PlusMinusButton
          type={eachQuantity > 0 ? 'minus' : 'plus'}
          backgroundColor={
            eachQuantity > 0 ? COLORS.REMOVE_CART_ITEM : COLORS.PRIMARY
          }
          onPress={
            eachQuantity > 0
              ? handleRemoveItem(product)
              : handleAddItem(product)
          }
        />
      </View>
      <RNTextScrollable
        extraSmall
        style={[styles.productTitle, {color: COLORS.TEXT_COLOR_C}]}>
        {product.title}
      </RNTextScrollable>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  item: {
    paddingVertical: COMMON_SIZE.COMMON_MARGIN,
    height: screenHeight / 3.5,
    borderRadius: 10,
    padding: 10,
    marginBottom: COMMON_SIZE.COMMON_MARGIN / 2,
  },
  productImage: {
    width: '100%',
    height: '50%',
    resizeMode: 'contain',
    marginBottom: COMMON_SIZE.COMMON_MARGIN,
  },
  heartImage: {
    height: scale(15),
    resizeMode: 'contain',
    marginBottom: COMMON_SIZE.COMMON_MARGIN,
  },
  productInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(5),
  },
  productPrice: {
    fontWeight: 'bold',
  },
  productTitle: {
    fontWeight: 'bold',
    marginBottom: COMMON_SIZE.COMMON_MARGIN / 2,
  },
});
