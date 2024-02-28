import React, {useEffect, useRef, useState} from 'react';
import {View, Dimensions, TouchableOpacity, StyleSheet,Text} from 'react-native';
import SlideItem from './SlideItem';
import Carousel from 'react-native-reanimated-carousel';
import type {ICarouselInstance} from 'react-native-reanimated-carousel';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import Pagination from './Pagination';
import {moderateScale, scale} from 'react-native-size-matters';

 import ProgressBar from './ProgressBar';

interface AnimatedCarouseProps {
  slides: any;
}

const AnimatedCarousel = (props: AnimatedCarouseProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<ICarouselInstance>(null);

  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [isFast, setIsFast] = useState(false);
  const [isPagingEnabled, setIsPagingEnabled] = useState(true);

  const window = Dimensions.get('window');
  const PAGE_WIDTH = window.width;
  const PAGE_HEIGHT = window.height;

  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,

  };

useEffect(() => {

  if(isAutoPlay){

    const timer = setTimeout(() => {

      const nextIndex = (currentIndex +1) % props.slides.length;
      setCurrentIndex(nextIndex);
      (carouselRef.current as any)?.scrollIndex(nextIndex, true);

    }, 5000);
    return () => clearTimeout(timer);

  }
}, [currentIndex, isAutoPlay,props.slides.length]);

const toggleAutoPlay = ():void => 
{ setIsAutoPlay(!isAutoPlay);

};



  return (
    <View style={styles.container}>
     
     <View style={styles.progressBarContainer}>
       {props.slides.map((_: any, index: number) => (
  
    <ProgressBar
      key={index}
      index={index} // Pass the index prop to each ProgressBar
      duration={5000} // 5 seconds for each story
      isActive={index === currentIndex} // Use the currentIndex state to activate the respective progress bar
    />

  ))}
</View>


      <Carousel
        {...baseOptions}
        loop={true}
        ref={carouselRef}
        style={{width: '100%', height: '100%'}}
        autoPlay={isAutoPlay}
        autoPlayInterval={isFast ? 100 : 2000}
        data={props.slides}
        pagingEnabled={isPagingEnabled}
        onSnapToItem={index => {
          setCurrentIndex(index);
          console.log('current index:', index);
        }}
         renderItem={({item}) => <SlideItem item={item} />}
      />
      <TouchableOpacity onPress={toggleAutoPlay} style={{padding: 20, backgroundColor: '#ddd', marginTop: 10 }} >
        <Text> {isAutoPlay ? 'Stop AutoPlay' :' Start AutoPlay'}</Text>
      </TouchableOpacity>

      <Pagination
        slides={props.slides}
        currentIndex={currentIndex}
        carouselRef={carouselRef}
      />

     
    </View> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: 'red',
    borderWidth: 5,
  },

  

  progressBarContainer: {
    position: 'absolute',
   // borderColor: 'red',
   // borderWidth: 5,
   
    top: 50, // You can adjust this value to where you want the progress bars to appear
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5, // Add some padding if needed
    zIndex: 1, // Ensure it's above other content
  },
});

export default AnimatedCarousel;
