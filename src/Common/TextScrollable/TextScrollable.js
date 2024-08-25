import {StyleSheet} from 'react-native';
import React from 'react';
import TextTicker from 'react-native-text-ticker';
import {COMMON_SIZE, FONTS} from '../../constants';
import {useTheme} from '../../Theme/ThemeContext';

const RNTextScrollable = ({
  small,
  extraSmall,
  medium,
  large,
  textColor,
  children,
  style,
  extraLarge,
  TextAlignCenter,
  duration = 6000,
  bounce = false,
  loop = true,
  marqueeDelay = 2000,
  repeatSpacer = 10,
  text,
  ManropeBold,
  ManropeSemiBold,
  ManropeMedium,
  ...props
}) => {
  const {COLORS} = useTheme();

  const fontSizeMapping = {
    small: COMMON_SIZE.SMALL,
    extraSmall: COMMON_SIZE.VERY_SMALL,
    medium: COMMON_SIZE.MEDIUM,
    large: COMMON_SIZE.LARGE,
    extraLarge: COMMON_SIZE.EXTRA_LARGE,
  };

  const fontSize =
    fontSizeMapping[
      small
        ? 'small'
        : extraSmall
        ? 'extraSmall'
        : medium
        ? 'medium'
        : large
        ? 'large'
        : extraLarge
        ? 'extraLarge'
        : 'normal'
    ] || COMMON_SIZE.SMALL;

  const fontFamily = ManropeBold
    ? FONTS.ManropeBold
    : ManropeSemiBold
    ? FONTS.ManropeSemiBold
    : ManropeMedium
    ? FONTS.ManropeMedium
    : FONTS.ManropeRegular;

  return (
    <TextTicker
      style={[
        {
          fontSize,
          color: textColor || COLORS.SOLID_FONT_COLOR,
          fontFamily,
        },
        TextAlignCenter && {textAlign: 'center'},
        style,
      ]}
      duration={duration}
      loop={loop}
      bounce={bounce}
      repeatSpacer={repeatSpacer}
      marqueeDelay={marqueeDelay}
      {...props}>
      {children}
    </TextTicker>
  );
};

export default RNTextScrollable;
