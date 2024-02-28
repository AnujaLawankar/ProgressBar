

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet,TouchableOpacity,Text } from 'react-native';
import Animated, { useAnimatedStyle, withTiming, useSharedValue } from 'react-native-reanimated';


interface ProgressBarProps {
  index: number; // Unique index for each progress bar
  isActive: boolean; // Determines if the progress bar is active
  duration: number; // Duration in milliseconds for the progress bar to fill
  isAutoPlay: boolean; 
  toggleAutoPlay: () => void; 
}

const ProgressBar: React.FC<ProgressBarProps> = ({ index, isActive, duration,isAutoPlay, toggleAutoPlay }) => {
  const progress = useSharedValue(0);

  
  // Animated style to interpolate width of the progress bar
  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  useEffect(() => {
    // Start or reset the progress animation based on isActive state
    progress.value = withTiming(isActive ? 1 : 0, {
      duration: isActive ? duration : 0,
    });
  }, [isActive, duration, progress]);


 

  return (
    
    <View style={styles.progressBarContainer}>
      <Animated.View style={[styles.progressBar, animatedStyle]} />
     
    </View>
   
  
    
    
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
   
    height: 8,
    width: '20%',
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
  },
  progressBar: {
    justifyContent:'center',
    height: '100%',
    backgroundColor: 'grey',
    borderRadius: 2,
    
  },

 
});

export default ProgressBar;
