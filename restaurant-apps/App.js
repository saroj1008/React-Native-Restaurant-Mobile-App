import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import RestaurantAppContext from './context/RestaurantAppContext';

import getRestaurantFoodData from './components/services/getRestaurantFoodData';

// Import AppStack and AuthStack
import AuthStack from './navigation/AuthStack';
import AppStack from './navigation/AppStack';


import { useEffect, useState } from 'react';
import getOwnerData from './components/services/getOwnerData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native-web';



// Root Component
export default function App() {


  const [foodData, setFoodData] = useState([]);
  const [ownerData, setOwnerData] = useState({}); // {_id: '6467cf154362eecd9bf9de98', firstName: 'Ranjan', lastName: 'Paudel', phone: '123456666', email: 'prabhu@miu.com', …}
  const [currentOwner, setCurrentOwner] = useState(null); // stores the id of owners who is logged in
  const [isLoadingSession, setIsLoadingSession] = useState(true);
  const [ownerToken, setOwnerToken] = useState(null);


  useEffect(() => {

    //getting food data, when it mounts
    getRestaurantFoodData().then(res => setFoodData(res)).catch(err => console.log(err));
    
    getTokenData().then((res) => {
      if (res.currentOwnerId) {
        return getOwnerData(res.currentOwnerId);
      }

      return { data: [] };

    }).then(res => {
      setOwnerData(res.data)
      setIsLoadingSession(false)
    }).catch(err => console.log(err));

  }, []);


  //get Data while mounts
  const getTokenData = async (key) => {
    try {
      const tokenValue = await AsyncStorage.getItem("ownerToken");
      const currentOwnerId = await AsyncStorage.getItem("currentOwnerID");
      if (tokenValue !== null && currentOwnerId !== null) {
        setOwnerToken(tokenValue);
        setCurrentOwner(currentOwnerId);
        console.log("tokenValue", tokenValue);

      } else {
        console.log('No data found for the given key.');
      }
      return { tokenValue, currentOwnerId };
    } catch (error) {
      throw error;
    }
  };

  console.log("test", currentOwner);


  return (
    <RestaurantAppContext.Provider value={{ foodData, setFoodData, ownerData, setOwnerData, ownerToken, setOwnerToken, setOwnerToken, currentOwner, setCurrentOwner }}>
      <NavigationContainer >
        {isLoadingSession ?
          <View style={styles.container}>
            <ActivityIndicator size="large" color="blue" />
          </View>
          : ownerToken !== null ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </RestaurantAppContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
