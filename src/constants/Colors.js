import {Platform} from 'react-native';
import {COLORS} from '../Theme/ThemeContext';

const COMMON_COLORS = {
  //theme colors
  BLACK: '#000000',
  WHITE: '#FFFFFF',
  //colors
  TRANSPARENT: 'transparent',
  //
  PRIMARY: '#2A4BA0',
  PRIMARY_FONT: '#FFFFFF',
  PRIMARY_DARK: '#153075',
  TEXT_COLOR_A: '#1B262E',
  TEXT_COLOR_B: '#354349',
  TEXT_COLOR_C: '#616A7D',
  TEXT_COLOR_D: '#A9B4BC',
  TEXT_COLOR_E: '#C5CDD2',
  TEXT_COLOR_F: '#E7ECF0',
  CART_COUNT_BG: '#F9B023',
  REMOVE_CART_ITEM: '#F94242',
  BG_LIGHT_COLOR: '#F8F9FB',
};

export const LIGHT_THEME = {
  ...COMMON_COLORS,
  BG_COLOR: COMMON_COLORS.WHITE,
  TEXT_COLOR: COMMON_COLORS.BLACK,
  //theme colors
};
export const DARK_THEME = {
  ...COMMON_COLORS,
  BG_COLOR: COMMON_COLORS.BLACK,
  TEXT_COLOR: COMMON_COLORS.WHITE,
  //theme colors
};
