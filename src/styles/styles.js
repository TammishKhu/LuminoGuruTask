import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {COLORS} from '../Theme/ThemeContext';
import {LIGHT_THEME} from '../constants/Colors';
const commonPadding = 10;

export const commonStyle = StyleSheet.create({
  SHADOW: {
    borderRadius: scale(8),
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 10,
    shadowColor: LIGHT_THEME.TEXT_COLOR_C,
  },
});
