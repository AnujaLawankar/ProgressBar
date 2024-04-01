import {StyleSheet, View} from 'react-native';
import React from 'react';

import AnimatedCarousel from './src/components/AnimatedCarousel';
import data from './src/components/data';


const App = () => {

  const CarouselType = AnimatedCarousel;
  //-- VS: if you want to use View here, which you might, you need to have flex:1 here
  return (
    <View style={styles.container}>

      <CarouselType slides={data} />
    
    </View>
  );
};

export default App;

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:'black'
  }
})