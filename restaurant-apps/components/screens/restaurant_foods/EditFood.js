import axios from '../../services/axios';
import React, { useContext, useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { Entypo } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';

import RestaurantAppContext from '../../../context/RestaurantAppContext';
import getRestaurantFoodData from '../../services/getRestaurantFoodData';



const EditFood = (props) => {
  const { _id, name, origin, price, date, image } = props.route.params;
  const [formData, setFormData] = useState({ name: name, origin: origin, price: price });
  const navigation = useNavigation();

  const { foodData, setFoodData } = useContext(RestaurantAppContext);

  // Function to handle the onPress event for the Save button
  const onPressedSave = async (id) => {

    try {
      // Send HTTP PATCH request to delete the food item
      await axios.patch(`http://localhost:4000/restaurants/6467ce1acb98898727c9d1df/foods/${id}`, formData);
      console.log("Sucessfully updated food item");
     

      // Update the food data after successful updation of data
      getRestaurantFoodData().then(res => setFoodData(res)).catch(err => console.log(err));
      navigation.navigate('listOfFood');
    } catch (error) {
      console.error('Error updating food item:', error);
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: image }}
        style={styles.image}
      />

      <TextInput
        value={formData.name}
        onChangeText={(text) => { setFormData({ ...formData, name: text }) }}
        placeholder="Name -Noodles"
        style={styles.inputField}
      />
      <TextInput
        value={formData.price}
        onChangeText={(text) => { setFormData({ ...formData, price: text }) }}
        placeholder="Price  -$10.99"
        style={styles.inputField}
      />
      <TextInput
        value={formData.origin}
        onChangeText={(text) => { setFormData({ ...formData, origin: text }) }}
        placeholder="Origin"
        style={styles.inputField}
      />

  {/* Button for update/save foodItem */}
      <TouchableOpacity style={styles.detailsButton}>
        <Entypo style={styles.detailsButtonText} onPress={() => onPressedSave(_id)} name="save" size={35} />
      </TouchableOpacity>

    </View>
  )
}

export default EditFood;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F4FE',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    borderColor: "#FFCD00",
    borderWidth: 4,
    borderRadius: 10,
    alignSelf: 'center',
    resizeMode: 'cover',
    marginTop: 10
  },
  inputField: {
    margin: 10,
    padding: 10,
    height: 40,
    borderColor: '#FFCD00',
    borderWidth: 2,
    backgroundColor: 'white',
    fontSize: 20
  },
  detailsButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 15,
    alignSelf: 'center',
    margin: 1,
  },
  detailsButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 40
  },
})