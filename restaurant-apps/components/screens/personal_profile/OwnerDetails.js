import React, { useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, AntDesign } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';

import RestaurantAppContext from '../../../context/RestaurantAppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OwnerDetails = () => {
  const { ownerData, setOwnerData, ownerToken, setOwnerToken } = useContext(RestaurantAppContext);
  const { _id, firstName, phone, lastName, email, address } = ownerData;

  const navigation = useNavigation();

  const onPressedEdit = () => {
    navigation.navigate('editOwner', { _id, firstName, lastName, phone, email, address });
  }

  //Remove token
  const onPressedOwnerLogout = async () => {
    setOwnerToken(null);
    await removeLoginData("ownerToken", "currentOwnerID");
   
  };

  const removeLoginData = async (...keys) => {
    try {
      await AsyncStorage.multiRemove(keys);

      console.log('Data removed successfully.');
    } catch (error) {
      console.log('Error removing data: ', error);
    }
  };



  return (
    <SafeAreaView>
      <View style={styles.container}>
        <MaterialCommunityIcons name="account-circle" color={"#1D71F2"} size={180} />
        <Text style={styles.name}>{firstName} {lastName}</Text>
        <Text style={styles.infoText}>+1-{phone}</Text>
        <Text style={styles.infoText}>{email}</Text>
        <Text style={styles.infoText}>{address}</Text>

        <TouchableOpacity style={styles.iconButton} onPress={onPressedEdit}>
          <AntDesign name="edit" color={"#1D71F2"} size={30} style={styles.iconButtonText} />
        </TouchableOpacity>

      </View>


      <View style={{ marginTop: 40 }}>
        <TouchableOpacity style={styles.logOutButton} onPress={onPressedOwnerLogout}>
          <AntDesign name="logout" color={"#1D71F2"} size={50} style={styles.iconButtonText} />
        </TouchableOpacity>
        <Text style={styles.logOutButtonText}>Logout</Text>
      </View>
    </SafeAreaView>
  )
}

export default OwnerDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#8ECEFB',
    borderRadius: 10,
    padding: 5,
    marginTop: 10,
    marginLeft: 4,
    marginRight: 4,
    alignItems: 'center',
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 20,
    marginBottom: 5,
  },

  detailsContainer: {
    flex: 1,
    flexDirection: 'column',
    marginRight: 10,
  },
  iconButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 15,
    alignSelf: 'flex-end',
    marginTop: 5,
    marginRight: 5
  },
  logOutButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 15,
    alignSelf: 'center',
    marginTop: 5,
    marginRight: 5
  },
  logOutButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',

  },
  iconButtonText: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
});
