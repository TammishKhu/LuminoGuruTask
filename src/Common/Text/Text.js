import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {COMMON_SIZE, FONTS} from '../../constants';
import {useTheme} from '../../Theme/ThemeContext';

const RNText = ({
  numberOfLines,
  small,
  extraSmall,
  medium,
  large,
  extraLarge,
  bold,
  semiBold,
  lightWeightFont,
  textColor,
  children,
  onPress,
  style,
  alignSelfCenter,
  underline,
  TextAlignCenter,
  customFontSize,
  fontFamily,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  marginHorizontal,
  margin,
  xxl,
  xxxl,
  ManRopeBold,
  ManRopeSemiBold,
  ManRopeMedium,
  ...props
}) => {
  const {COLORS} = useTheme();

  const fontSize = (() => {
    if (small) return COMMON_SIZE.SMALL;
    if (extraSmall) return COMMON_SIZE.VERY_SMALL;
    if (medium) return COMMON_SIZE.MEDIUM;
    if (large) return COMMON_SIZE.LARGE;
    if (extraLarge) return COMMON_SIZE.EXTRA_LARGE;
    return customFontSize || COMMON_SIZE.SMALL;
  })();

  const FontFamily = ManRopeBold
    ? FONTS.ManropeBold
    : ManRopeSemiBold
    ? FONTS.ManropeSemiBold
    : ManRopeMedium
    ? FONTS.ManropeMedium
    : fontFamily || FONTS.ManropeRegular;
  const color = textColor || COLORS.TEXT_COLOR_A;

  return (
    <Text
      disabled={!onPress}
      onPress={onPress}
      numberOfLines={numberOfLines}
      style={[
        styles.textStyle,
        {
          fontSize,
          fontFamily: FontFamily,
          color,
          textDecorationLine: underline ? 'underline' : 'none',
          alignSelf: alignSelfCenter ? 'center' : 'auto',
          textAlign: TextAlignCenter ? 'center' : 'auto',
          marginTop,
          marginBottom,
          marginLeft,
          marginRight,
          marginHorizontal,
          margin,
        },
        style,
      ]}
      {...props}>
      {children}
    </Text>
  );
};

export default RNText;

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: FONTS.ManropeRegular,
  },
});
