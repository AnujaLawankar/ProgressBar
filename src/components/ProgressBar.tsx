

// import React, { useEffect, useRef } from 'react';
// import { View, StyleSheet,TouchableOpacity,Text } from 'react-native';
// import Animated, { useAnimatedStyle, withTiming, useSharedValue } from 'react-native-reanimated';


// interface ProgressBarProps {
//   index: number; // Unique index for each progress bar
//   isActive: boolean; // Determines if the progress bar is active
//   duration: number; // Duration in milliseconds for the progress bar to fill
//   isAutoPlay: boolean; 
//   toggleAutoPlay: () => void; 
// }

// const ProgressBar: React.FC<ProgressBarProps> = ({ index, isActive, duration,isAutoPlay, toggleAutoPlay }) => {
//   const progress = useSharedValue(0);

  
//   // Animated style to interpolate width of the progress bar
//   const animatedStyle = useAnimatedStyle(() => ({
//     width: `${progress.value * 100}%`,
//   }));

//   useEffect(() => {
//     // Start or reset the progress animation based on isActive state
//     progress.value = withTiming(isActive ? 1 : 0, {
//       duration: isActive ? duration : 0,
//     });
//   }, [isActive, duration, progress]);


 

//   return (
    
//     <View style={styles.progressBarContainer}>
//       <Animated.View style={[styles.progressBar, animatedStyle]} />
     
//     </View>
   
  
    
    
//   );
// };

// const styles = StyleSheet.create({
//   progressBarContainer: {
   
//     height: 8,
//     width: '20%',
//     backgroundColor: '#E0E0E0',
//     borderRadius: 2,
//   },
//   progressBar: {
//     justifyContent:'center',
//     height: '100%',
//     backgroundColor: 'grey',
//     borderRadius: 2,
    
//   },

 
// });

// export default ProgressBar;
import React, {useEffect} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface ProgressBarProps {
  duration: number; // Duration in milliseconds
  index: number; // Index of this progress bar
  currentIndex: number; // Current active index in the carousel
  onPress: (index: number) => void; // Function to handle press event
  isPlay: boolean; // Controls if the progress should play or pause
}

//-- https://www.color-hex.com/color/8b8680
const visitedColor = 'white';
const inactiveColor = '#615d59';
const currentColor = '#8b8680';

const ProgressBar = ({
  duration,
  currentIndex,
  index,
  onPress,
  isPlay,
}: ProgressBarProps) => {
  const barProgress = useSharedValue(0);
  const isActive = currentIndex === index;

  // Determine if the item should be considered as visited based on its index relative to the current index.
  // If `isPlay` is true, items at the current index and before are considered visited.
  // If `isPlay` is false, items strictly before the current index are considered visited.
  const isVisited = index < currentIndex + (isPlay ? 0 : 1);

  // Start with assuming the initial background color is for inactive items.
  let initialBackgroundColor = inactiveColor;

  // If the item is visited, use the visited color instead.
  if (isVisited) {
    initialBackgroundColor = visitedColor;
  }

  // If the carousel is not in play mode and the item is active, override the background color with the current color.
  // This makes the active item stand out.
  if (!isPlay && isActive) {
    initialBackgroundColor = currentColor;
  }

  const progressStyle = useAnimatedStyle(() => ({
    width: isActive ? `${barProgress.value * 100}%` : '100%',
    backgroundColor:
      barProgress.value === 0 ? initialBackgroundColor : visitedColor,
  }));

  useEffect(() => {

    let startTime = 0;
    
    if (isActive) {
      if (isPlay) {
        // Start or continue progress
        barProgress.value = withTiming(1, {
          duration: duration * (1 - barProgress.value),
        }, (isFinished) => {
          // Only calculate and log the duration if the animation completes successfully
          if (isFinished) {
            const endTime = new Date().getTime();
            const animationDuration = endTime - startTime;
            console.log(`Animation for slide ${index} took ${animationDuration} ms to complete.`);
          }
        }
        );
      } else {
        // Pause progress
        cancelAnimation(barProgress);
      }
    } else {
      // Reset progress for non-active indices or when currentIndex changes
      barProgress.value = 0;
    }
    console.log(`Animating slide ${index}, isActive: ${isActive}, isPlay: ${isPlay}`);

  }, [isPlay, duration, currentIndex, index,isActive, barProgress]);

  return (
    <TouchableOpacity
      hitSlop={{top: 30, bottom: 30}}
      onPress={() => onPress(index)}
      style={[
        localStyles.progressBarBackground,
        {backgroundColor: initialBackgroundColor},
      ]}>
      <Animated.View
        style={[localStyles.progressBarForeground, progressStyle]}
      />
    </TouchableOpacity>
  );
};

const localStyles = StyleSheet.create({
  progressBarBackground: {
    flex: 1,
    height: 6,
    borderRadius: 2.5,
    overflow: 'hidden',
    marginHorizontal: 2,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
  },
  progressBarForeground: {
    height: 6,
    borderRadius: 2.5,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'grey',
  },
});

export default ProgressBar;