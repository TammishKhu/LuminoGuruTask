import {Dimensions} from 'react-native';
import {scale} from 'react-native-size-matters';

export const COMMON_SIZE = {
  ELEVATION: 8,
  VERY_SMALL: scale(12),
  SMALL: scale(14),
  MEDIUM: scale(16),
  NORMAL: scale(18),
  LARGE: scale(20),
  MEDIUM_LARGE: scale(26),
  EXTRA_LARGE: scale(30),
  COMMON_MARGIN: scale(15),
  screenHeight: Dimensions.get('screen').height,
};
export const screenHeight = Dimensions.get('screen').height;
export const screenWidth = Dimensions.get('screen').width;
