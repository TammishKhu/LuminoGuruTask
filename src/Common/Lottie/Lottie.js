import {StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import LottieView from 'lottie-react-native';
import {useTheme} from '../../Theme/ThemeContext';
let emptyCart = require('../../assets/json/emptyCart.json');

const Lottie = ({source, style, onAnimationFinish, loop}) => {
  const animationRef = useRef(null);
  const {COLORS} = useTheme();
  return (
    <LottieView
      autoPlay
      loop={loop || false}
      style={style}
      ref={animationRef}
      source={source || emptyCart}
      onAnimationFinish={onAnimationFinish}
    />
  );
};

export default Lottie;

const styles = StyleSheet.create({});
