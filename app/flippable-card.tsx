import React from 'react';
import { View, Image } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  interpolate,
} from 'react-native-reanimated';

const SPRING_CONFIG = {
  damping: 15,
  stiffness: 100,
  mass: 0.8,
};

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
      
      let targetRotation = 0;
      if (shouldFlip) {
        // --- Core Logic for Continuous Flip ---
        // If swiping right (positive translation/velocity), find the *next* multiple of 180.
        // If swiping left (negative translation/velocity), find the *previous* multiple of 180.
        const direction = (event.translationX > 0 || event.velocityX > 0) ? 1 : -1;
        if (direction > 0) {
            targetRotation = (Math.floor(rotateY.value / 180) + 1) * 180;
        } else {
            targetRotation = (Math.ceil(rotateY.value / 180) - 1) * 180;
        }
      } else {
        // If the gesture wasn't strong enough, snap back to the nearest side.
        targetRotation = Math.round(rotateY.value / 180) * 180;
      }

      // Animate to the calculated target rotation with a spring effect.
      rotateY.value = withSpring(targetRotation, SPRING_CONFIG);
    },
  });

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateYDeg = `${rotateY.value}deg`;
    
    // Normalize rotation to 0-360 range
    const normalizedRotation = ((rotateY.value % 360) + 360) % 360;
    console.log(normalizedRotation, 'normalizedRotation value');
    
    // Calculate opacity based on normalized rotation
    const opacity = interpolate(
      normalizedRotation,
      [0, 90, 271, 360],
      [1, 0, 0, 1],
      'clamp'
    );

    return {
      transform: [{ perspective: 1000 }, { rotateY: rotateYDeg }],
      opacity,
      backfaceVisibility: 'hidden',
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateYDeg = `${rotateY.value + 180}deg`;
    
    // Normalize rotation to 0-360 range
    const normalizedRotation = ((rotateY.value % 360) + 360) % 360;
    console.log(rotateY.value, 'normalizedRotation value');
    
    
    // Calculate opacity for back face (opposite of front)
    const opacity = interpolate(
      normalizedRotation,
      [0, 90, 270, 360],
      [0, 1, 1, 0],
      'clamp'
    );

    return {
      transform: [{ perspective: 1000 }, { rotateY: rotateYDeg }],
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
            frontAnimatedStyle,
          ]}
        >
          <Image
            source={{
              uri: 'https://res.cloudinary.com/dqtlhm4to/image/upload/v1749853135/vxovlqcvumcqy6igxoeh.jpg',
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
            backAnimatedStyle,
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

      </Animated.View>
    </PanGestureHandler>
  );
};

export default FlippableCard;