import {useRef} from 'react';
import {Animated} from 'react-native';

const useBounceAnimation = () => {
  const bounceValue = useRef(new Animated.Value(1)).current;
  const rotateValue = useRef(new Animated.Value(0)).current;

  const bounceAnimation = () => {
    bounceValue.setValue(1); // Reset value to original
    rotateValue.setValue(0); // Reset rotation

    Animated.parallel([
      Animated.timing(bounceValue, {
        toValue: 1.2, // Scale up
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(rotateValue, {
        toValue: 1, // Full rotation
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.timing(bounceValue, {
        toValue: 1, // Scale back down
        duration: 150,
        useNativeDriver: true,
      }).start();
    });
  };

  const rotateInterpolate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'], // Rotate 360 degrees
  });

  return {bounceValue, bounceAnimation, rotateInterpolate};
};
export default useBounceAnimation;
