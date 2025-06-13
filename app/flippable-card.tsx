import React from 'react';
import { View, Image } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';

const FlippableCard = () => {
  const rotateY = useSharedValue(0);
  const isFlipped = useSharedValue(false);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startRotation = rotateY.value;
    },
    onActive: (event, context) => {
      // Calculate rotation based on gesture translation
      const newRotation = context.startRotation + (event.translationX / 200) * 180;
      rotateY.value = newRotation;
    },
    onEnd: (event) => {
      const velocity = event.velocityX;
      const translation = event.translationX;
      
      // Determine if we should flip based on translation distance and velocity
      const shouldFlip = Math.abs(translation) > 50 || Math.abs(velocity) > 500;
      
      if (shouldFlip) {
        if (translation > 0 || velocity > 0) {
          // Swipe right - flip to back if showing front, or stay on back
          rotateY.value = withSpring(isFlipped.value ? 0 : 180);
          isFlipped.value = !isFlipped.value;
        } else {
          // Swipe left - flip to front if showing back, or stay on front
          rotateY.value = withSpring(isFlipped.value ? 0 : 180);
          isFlipped.value = !isFlipped.value;
        }
      } else {
        // Snap back to current side
        rotateY.value = withSpring(isFlipped.value ? 180 : 0);
      }
    },
  });

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateYDeg = `${rotateY.value}deg`;
    const opacity = interpolate(
      Math.abs(rotateY.value % 360),
      [0, 90, 180],
      [1, 0, 0]
    );

    return {
      transform: [{ rotateY: rotateYDeg }],
      opacity,
      backfaceVisibility: 'hidden',
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateYDeg = `${rotateY.value + 180}deg`;
    const opacity = interpolate(
      Math.abs(rotateY.value % 360),
      [0, 90, 180],
      [0, 0, 1]
    );

    return {
      transform: [{ rotateY: rotateYDeg }],
      opacity,
      backfaceVisibility: 'hidden',
    };
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={{ width: '87%', height: '70%' }}>
        {/* Front side */}
        <Animated.View
          style={[
            {
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundColor: 'black',
              marginTop: 56,
              borderRadius: 24,
              overflow: 'hidden',
              marginBottom: 176,
              elevation: 20,
              shadowColor: 'black',
            },
            frontAnimatedStyle,
          ]}
        >
          <Image
            source={{
              uri: 'https://res.cloudinary.com/dqtlhm4to/image/upload/v1749850261/b099ddd0-8731-400f-81e7-8c722ed5e659.png',
            }}
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />
        </Animated.View>

        {/* Back side */}
        <Animated.View
          style={[
            {
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundColor: '#333',
              marginTop: 56,
              borderRadius: 24,
              overflow: 'hidden',
              marginBottom: 176,
              elevation: 20,
              shadowColor: 'black',
              justifyContent: 'center',
              alignItems: 'center',
            },
            backAnimatedStyle,
          ]}
        >
          {/* Replace this with your second element */}
          <Image
            source={{
              uri: 'https://res.cloudinary.com/dqtlhm4to/image/upload/v1749850261/bbb7a3137c7a186012cf99ad987d1f3e.png',
            }}
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default FlippableCard;