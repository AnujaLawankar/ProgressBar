import React, { useState,useEffect} from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet,Modal } from 'react-native';
import { WebView } from 'react-native-webview';

// type Item = {
//     itemName: string;
//     licenses:string;
//     repository:string;
//     licenseUrl:string;
//     parents:string;
//   };
  
// Sample JSON object
const rawData = {
  "items": [
    {
        "react-native-gesture-handler@2.15.0": {
            "licenses": "MIT",
            "repository": "https://github.com/software-mansion/react-native-gesture-handler",
            "licenseUrl": "https://github.com/software-mansion/react-native-gesture-handler/raw/master/LICENSE",
            "parents": "ProgressBar"
        },
        "react-native-reanimated-carousel@3.5.1": {
            "licenses": "MIT",
            "repository": "https://github.com/dohooo/react-native-reanimated-carousel",
            "licenseUrl": "https://github.com/dohooo/react-native-reanimated-carousel/raw/master/LICENSE",
            "parents": "ProgressBar"
        },
        "react-native-reanimated@3.7.1": {
            "licenses": "MIT",
            "repository": "https://github.com/software-mansion/react-native-reanimated",
            "licenseUrl": "https://github.com/software-mansion/react-native-reanimated/raw/master/LICENSE",
            "parents": "ProgressBar"
        },
        "react-native-size-matters@0.4.2": {
            "licenses": "MIT",
            "repository": "https://github.com/nirsky/react-native-size-matters",
            "licenseUrl": "https://github.com/nirsky/react-native-size-matters/raw/master/LICENSE",
            "parents": "ProgressBar"
        },
        "react-native-vector-icons@10.0.3": {
            "licenses": "MIT",
            "repository": "https://github.com/oblador/react-native-vector-icons",
            "licenseUrl": "https://github.com/oblador/react-native-vector-icons/raw/master/LICENSE",
            "parents": "ProgressBar"
        },
        "react-native@0.73.4": {
            "licenses": "MIT",
            "repository": "https://github.com/facebook/react-native",
            "licenseUrl": "https://github.com/facebook/react-native/raw/master/LICENSE",
            "parents": "ProgressBar"
        },
        "react@18.2.0": {
            "licenses": "MIT",
            "repository": "https://github.com/facebook/react",
            "licenseUrl": "https://github.com/facebook/react/raw/master/LICENSE",
            "parents": "ProgressBar"
        }
    }
    
  ]
};


// Transform raw data to a flat list structure
const items = Object.entries(rawData.items[0]).map(([itemName, details]) => ({
  itemName,
  details,
}));

// Define TypeScript types for item details
type ItemDetails = {
  licenses: string;
  repository: string;
  licenseUrl: string;
};

type Item = {
  itemName: string;
  details: ItemDetails;
};




// const flatData = Object.entries(data.items[0]).map(([itemName, details]) => ({
//     itemName,
//     ...details,
//   }));
  


// const ItemList = () => {
//   // State to keep track of expanded items
//   const [expandedItems, setExpandedItems] = useState<string[]>([]);

//   useEffect(() => {
//     console.log("Rendering ItemList with items:", flatData);
//   }, []);


//   // Function to handle the press event on an item
//   // const toggleItemExpansion = (itemName: string) => {
//   //   if (expandedItems.includes(itemName)) {
//   //     // If the item is already expanded, collapse it
//   //     setExpandedItems(expandedItems.filter(item => item !== itemName));
//   //   } else {
//   //     // Otherwise, expand it
//   //     setExpandedItems([...expandedItems, itemName]);
//   //   }
//   // };


//   const toggleItemExpansion = (itemName: string) => {
//     const isCurrentlyExpanded = expandedItems.includes(itemName);
//     if (isCurrentlyExpanded) {
//       // If the item is already expanded, collapse it
//       const newExpandedItems = expandedItems.filter(item => item !== itemName);
//       setExpandedItems(newExpandedItems);
//       console.log(`Collapsing ${itemName}. Expanded items now:`, newExpandedItems);
//     } else {
//       // Otherwise, expand it
//       const newExpandedItems = [...expandedItems, itemName];
//       setExpandedItems(newExpandedItems);
//       console.log(`Expanding ${itemName}. Expanded items now:`, newExpandedItems);
//     }
//   };
  
//   // Render function for each item
//   const renderItem = ({ item }: { item: Item }) => {
//     const isExpanded = expandedItems.includes(item.itemName);
//     return (
//       <TouchableOpacity style={styles.itemContainer} onPress={() => toggleItemExpansion(item.itemName)}>
//         <Text>{item.itemName}</Text>
//         <Text style={styles.arrow}>{isExpanded ? '↓' : '→'}</Text>
//         {isExpanded && <Text style={styles.liststyle}>{item.licenses}</Text>}
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <FlatList
//       data={flatData}
//       renderItem={renderItem}
//       keyExtractor={item => item.itemName}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   itemContainer: {
//     flex:0.5,
//     flexDirection: 'column',
//     padding: 10,
   
//     zIndex:2,
//   },
//   arrow: {
//     // Style your arrow here


//   },
//   liststyle:{
    
//   }
  
// });
const ItemList = () => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedUrl, setSelectedUrl] = useState<string>('');

  const toggleItemExpansion = (itemName: string) => {
    setExpandedItems(expandedItems.includes(itemName) ? expandedItems.filter(item => item !== itemName) : [...expandedItems, itemName]);
  };

  const renderItem = ({ item }: { item: Item }) => {
    const isExpanded = expandedItems.includes(item.itemName);
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={() => toggleItemExpansion(item.itemName)}>
        <Text>{item.itemName}</Text>
        <Text style={styles.arrow}>{isExpanded ? '↓' : '→'}</Text>
        {isExpanded && (
          <View>
            <Text>Licenses: {item.details.licenses}</Text>
            <Text>Repository: {item.details.repository}</Text>
            <TouchableOpacity onPress={() => { setModalVisible(true); setSelectedUrl(item.details.licenseUrl); }}>
              <Text style={styles.licenseLink}>View License</Text>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.itemName}
      />
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <WebView source={{ uri: selectedUrl }} />
        <TouchableOpacity
          style={styles.closeModalButton}
          onPress={() => setModalVisible(!modalVisible)}>
          <Text style={styles.closeModalButtonText}>Close</Text>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'column',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  arrow: {
    // Style your arrow here
  },
  licenseLink: {
    marginTop: 5,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  closeModalButton: {
    alignSelf: 'center',
    marginTop: 20,
    padding: 10,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
  },
  closeModalButtonText: {
    color: 'black',
  },
  // Add more styles as needed
});


export default ItemList;
