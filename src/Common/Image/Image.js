import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import React, {useState} from 'react';
import ImageView from 'react-native-image-viewing';
import {scale} from 'react-native-size-matters';
import {commonStyle} from '../../styles/styles';
import {useTheme} from '../../Theme/ThemeContext';

const RNImage = ({
  singleClickPreview,
  onPress,
  source,
  style,
  borderRadius = 0,
  borderTopRightRadius = 0,
  borderTopLeftRadius = 0,
  imageStyle,
  resizeMode,
  tintColor,
  shadow,
  Loading,
  defaultSource,
  children,
}) => {
  const {COLORS} = useTheme();
  const [loading, setloading] = useState(true);
  const [visible, setIsVisible] = useState(false);
  return (
    <Pressable
      hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
      onLongPress={() => (source?.uri ? setIsVisible(true) : null)}
      onPress={
        singleClickPreview && source?.uri ? () => setIsVisible(true) : onPress
      }
      style={[
        styles.imageStyle,
        borderRadius && {borderRadius},
        borderTopLeftRadius && {borderTopLeftRadius},
        borderTopRightRadius && {borderTopRightRadius},
        shadow && {
          ...commonStyle.SHADOW,
          backgroundColor: COLORS.PRIMARY,
          shadowColor: COLORS.SHADOW_COLOR,
        },
        style,
      ]}>
      <Image
        defaultSource={defaultSource}
        source={source}
        style={[
          styles.image,
          tintColor && {tintColor},
          borderRadius && {borderRadius},
          borderTopLeftRadius && {borderTopLeftRadius},
          borderTopRightRadius && {borderTopRightRadius},
          resizeMode && {resizeMode},
          imageStyle,
        ]}
      />
      {Loading ? (
        <View style={styles.loader}>
          <ActivityIndicator color={COLORS.PRIMARY} />
        </View>
      ) : null}
      {source?.uri ? (
        <ImageView
          images={[
            {
              uri: source?.uri,
            },
          ]}
          imageIndex={0}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}
        />
      ) : null}
      {children ? children : null}
    </Pressable>
  );
};

export default RNImage;

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  imageStyle: {
    width: scale(24),
    height: scale(24),
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
  },
});
