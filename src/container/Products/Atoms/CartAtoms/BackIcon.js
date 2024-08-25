import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {useTheme} from '../../../../Theme/ThemeContext';
import {RNImage} from '../../../../Common';
import {IMAGES} from '../../../../constants';
import {scale} from 'react-native-size-matters';
import {_onPressGoBackNavigate} from '../../../../utils/commonFunction';

const BackIcon = () => {
  const {COLORS} = useTheme();

  const handlePress = () => {
    _onPressGoBackNavigate();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={styles.container(COLORS.TEXT_COLOR_F)}>
      <RNImage
        onPress={handlePress}
        source={IMAGES.backIcon}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

export default BackIcon;

const styles = StyleSheet.create({
  container: backgroundColor => ({
    height: scale(40),
    width: scale(40),
    borderRadius: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor,
  }),
  image: {
    height: scale(9),
    width: scale(9),
  },
});
