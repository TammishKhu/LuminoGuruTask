import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useTheme} from '../../../../Theme/ThemeContext';
import {STRINGS} from '../../../../constants';
import {commonStyle} from '../../../../styles/styles';
import {RNText} from '../../../../Common';
import DetailRow from './DetailRow';
import {useSelector} from 'react-redux';

const CheckoutSection = ({onCheckout}) => {
  const {COLORS} = useTheme();
  const {productsData} = useSelector(state => state.productsReducer);
  const [subtotal, setSubtotal] = useState(0);
  const delivery = 20;
  useEffect(() => {
    // Calculate subtotal based on price and quantity
    let calculatedSubtotal = 0;
    productsData.forEach(item => {
      calculatedSubtotal += item.price * item.quantity || 0;
    });
    setSubtotal(calculatedSubtotal);

    console.log('productsData____Start', productsData, 'productsData____999');
  }, [productsData]);
  const total = subtotal + delivery;
  return (
    <View style={[styles.container, {backgroundColor: COLORS.BG_LIGHT_COLOR}]}>
      <View style={styles.detailsContainer}>
        <DetailRow
          label={STRINGS.subTotal}
          value={`$${subtotal.toFixed(2)}`}
          color={COLORS.TEXT_COLOR}
        />
        <DetailRow
          label={STRINGS.Delivery}
          value={`$${delivery.toFixed(2)}`}
          color={COLORS.TEXT_COLOR}
        />
        <DetailRow
          label={STRINGS.Total}
          value={`$${total.toFixed(2)}`}
          color={COLORS.TEXT_COLOR}
        />
      </View>
      <TouchableOpacity
        style={[styles.checkoutButton, {backgroundColor: COLORS.PRIMARY}]}
        onPress={onCheckout}>
        <RNText
          ManRopeBold
          extraSmall
          style={[
            {
              color: COLORS.PRIMARY_FONT,
            },
          ]}>
          {STRINGS.proceedToCheckout}
        </RNText>
      </TouchableOpacity>
    </View>
  );
};

export default CheckoutSection;

const styles = StyleSheet.create({
  container: {
    ...commonStyle.SHADOW,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: scale(30),
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
  },
  detailsContainer: {
    marginBottom: scale(15),
  },
  checkoutButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: scale(12),
    borderRadius: scale(12),
  },
});
