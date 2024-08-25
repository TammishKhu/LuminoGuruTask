import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {IMAGES} from '../../../constants';
import {useTheme} from '../../../Theme/ThemeContext';
import {scale} from 'react-native-size-matters';

const PlusMinusButton = ({
  type,
  onPress,
  backgroundColor,
  size = 25,
  iconColor,
}) => {
  const {COLORS} = useTheme();
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: backgroundColor || COLORS.PRIMARY,
            height: size,
            width: size,
            borderRadius: size / 2,
          },
        ]}>
        <Image
          source={type === 'plus' ? IMAGES.plus : IMAGES.minus}
          style={[
            styles.icon,
            {
              tintColor: iconColor || COLORS.WHITE,
            },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: scale(10),
    height: scale(10),
  },
});

export default PlusMinusButton;
