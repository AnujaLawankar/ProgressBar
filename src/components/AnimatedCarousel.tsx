import React, {useEffect, useRef, useState} from 'react';
import {View, Dimensions, TouchableOpacity, StyleSheet,Text, FlatList} from 'react-native';
import SlideItem from './SlideItem';
import Carousel from 'react-native-reanimated-carousel';
import type {ICarouselInstance} from 'react-native-reanimated-carousel';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import Pagination from './Pagination';
import {moderateScale, scale} from 'react-native-size-matters';
import ItemList from './ItemList'; 

 import ProgressBar from './ProgressBar';


 
 
interface AnimatedCarouseProps {
  slides: any;
}

interface CustomCarouselInstance extends ICarouselInstance {
  scrollToIndex?: (index: number, animated?: boolean) => void;
}



const AnimatedCarousel = (props: AnimatedCarouseProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
 // const carouselRef = useRef<ICarouselInstance>(null);
  const carouselRef = useRef<CustomCarouselInstance>(null);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [isFast, setIsFast] = useState(false);
  const [isPagingEnabled, setIsPagingEnabled] = useState(true);
  const [showItemList, setShowItemList] =useState(false);




  const window = Dimensions.get('window');
  const PAGE_WIDTH = window.width;
  const PAGE_HEIGHT = window.height;

  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,

  };
  const onSnapToItem = (index: number) => {
    setCurrentIndex(index);
    carouselRef.current?.scrollToIndex?.(index, true);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
  };


  return (
    <View style={styles.container}>
     
    

<View
          style={{
            // borderColor: 'red',
            // borderWidth: 5,
            zIndex: 1,
            flexDirection: 'row',
            marginTop: moderateScale(20),
            marginBottom: moderateScale(-25),
            marginHorizontal: moderateScale(2),
          }}>
          {props.slides.map((_:any, index:number) => {
            return (
              <ProgressBar
                key={index}
                duration={10000}
                index={index}
                currentIndex={currentIndex}
                isPlay={isAutoPlay}
                onPress={ onSnapToItem}
              />
            );
          })}
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
     
     <TouchableOpacity onPress={() => setShowItemList(!showItemList)}
     style={styles.showListButton}>
     <Text style={styles.showListButtonText} >
      {showItemList ? 'Hide List' : 'Show List'}
     </Text>
     </TouchableOpacity>
     
      <Pagination
        slides={props.slides}
        currentIndex={currentIndex}
        carouselRef={carouselRef}
      />
 
 <TouchableOpacity onPress={toggleAutoPlay} style={styles.autoplayButton} >
        <Text style={styles.autoplayButtonText}>
           {isAutoPlay ? 'Stop' :' Start'}
           </Text>
      </TouchableOpacity>
     
     
      {showItemList && <ItemList />}

  
    </View> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.6,
    borderColor: 'red',
    borderWidth: 5,
    zIndex:1,
   
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
  autoplayButton: {
    position:'absolute',
   
    top:250,
    zIndex:2,
    padding: 10,
    backgroundColor: 'grey', // A nice purple color
    marginTop: 5,
    borderRadius: 20, // Rounded corners
    alignItems: 'center', // Center the text inside the button
    justifyContent: 'center', // Center vertically in case of height adjustments
    width: 70, // Set a fixed width
    height:50,
    alignSelf: 'center', // Center the button in its container
    elevation: 3, // Add shadow for Android
    shadowOpacity: 0.3, // Shadow for iOS
    shadowRadius: 5,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
     

  },
  showListButton: {
    position:'absolute',
    
    top:310,
    zIndex:2,
    padding: 10,
    backgroundColor: 'grey', // A nice purple color
    marginTop: 5,
    borderRadius: 20, // Rounded corners
    alignItems: 'center', // Center the text inside the button
    justifyContent: 'center', // Center vertically in case of height adjustments
    width: 70, // Set a fixed width
    height:60,
    alignSelf: 'center', // Center the button in its container
    elevation: 3, // Add shadow for Android
    shadowOpacity: 0.3, // Shadow for iOS
    shadowRadius: 5,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 2 },
  },
  showListButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
  },


  autoplayButtonText : {
    color: '#FFFFFF', // White text color
    fontSize: 16, // Slightly larger font
    fontWeight: 'bold', // Bold font weight

  },

});

export default AnimatedCarousel;
