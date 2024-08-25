import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {COMMON_SIZE} from '../../../../constants';
import {useSelector} from 'react-redux';
import EachCartItem from './EachCartItem';
import {scale} from 'react-native-size-matters';

const CartItems = () => {
  const {productsData} = useSelector(state => state.productsReducer);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: scale(300),
      }}
      showsVerticalScrollIndicator={false}
      style={{
        paddingVertical: COMMON_SIZE.COMMON_MARGIN,
      }}>
      {productsData.map((product, index) => {
        if (product.quantity > 0) {
          return <EachCartItem product={product} />;
        }
        return null;
      })}
    </ScrollView>
  );
};

export default CartItems;

const styles = StyleSheet.create({});
