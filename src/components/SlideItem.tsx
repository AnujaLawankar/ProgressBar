import {
    Image,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Animated,
    Easing,
    TouchableOpacity,
  } from 'react-native';
  import React from 'react';
  import {moderateScale} from 'react-native-size-matters';
  // import Ionicons from 'react-native-vector-icons/Ionicons';
  
  const {width, height} = Dimensions.get('window');
  
  const iconSize = moderateScale(30);
  const iconColor = 'white';
  
  const SlideItem = ({item}: any) => {
    const translateYImage = new Animated.Value(0);
  
    return (
      <>
        <Animated.Image
          source={item.img}
          style={[
            styles.image,
  
            {
              transform: [
                {
                  translateY: translateYImage,
                },
              ],
            },
          ]}
        />
  
  
        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
        </View>
      </>
    );
  };
  
  export default SlideItem;
  
  const styles = StyleSheet.create({
    image: {
      flex: 0.9,
      width: '100%',
    },
  
  
    content: {
      flex: 0.2,
      backgroundColor: 'black',
    },
    textContainer: {
      marginBottom: moderateScale(34),
    },
  
    title: {
      fontSize: moderateScale(18),
      fontWeight: 'bold',
      color: 'white',
    },
    description: {
      fontSize: moderateScale(15),
      color: 'white',
    },
    price: {
      fontSize: moderateScale(13),
      fontWeight: 'bold',
      color: 'white',
    },
  });
  