import axios from '../../services/axios';
import React, { useContext, useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Entypo } from 'react-native-vector-icons';
import { Ionicons } from 'react-native-vector-icons';

import RestaurantAppContext from '../../../context/RestaurantAppContext';
import getRestaurantFoodData from '../../services/getRestaurantFoodData';
import { useNavigation } from '@react-navigation/native';



const AddNewFood = (props) => {
const navigation = useNavigation();


  const { foodData, setFoodData } = useContext(RestaurantAppContext);
  const [formData, setFormData] = useState({
    name: "",
    origin: "",
    price: 0,
    image: "",
    category: "Fast Food",
    description: "Best food ever"
  });

  // function to handle the event onPressed Save Button
  // router.put('/:restaurant_code/foods', restaurantController.addFood); // Add new food
  const onPressedSubmit = async () => {
  
    try {
      
      await axios.put('http://localhost:4000/restaurants/6467ce1acb98898727c9d1df/foods', formData);
      console.log("Sucessfully added new food ");


      // Update the food data after successful updation of data
      getRestaurantFoodData().then(res => setFoodData(res)).catch(err => console.log(err));
      navigation.navigate('listOfFood');
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <View style={styles.container}>

      <Ionicons name="fast-food-outline" color={"#1D71F2"} size={180} style={{alignSelf:"center"}} />

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

      <TextInput
        value={formData.image}
        onChangeText={(text) => { setFormData({ ...formData, image: text }) }}
        placeholder="image -tharucottage.com/momo.jpg"
        style={styles.inputField}
      />

      {/* Button to add/ Submit new food */}
      <TouchableOpacity style={styles.submitButton}>
        <Entypo style={styles.submitButtonText} onPress={onPressedSubmit} name="save" size={35} />
      </TouchableOpacity>

    </View>
  )
}

export default AddNewFood;


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
  submitButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 15,
    alignSelf: 'center',
    margin: 1,
  },
  submitButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 40
  },
})