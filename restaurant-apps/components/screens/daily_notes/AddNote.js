import { useNavigation } from '@react-navigation/native';
import axios from '../../services/axios';
import React, { useContext, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo } from 'react-native-vector-icons';

import getOwnerData from '../../services/getOwnerData';
import RestaurantAppContext from '../../../context/RestaurantAppContext';


const AddNote = () => {
  const [formData, setFormData] = useState({ title: "", comment: "" })
  const { setOwnerData, currentOwner } = useContext(RestaurantAppContext);
  const navigation = useNavigation();


  const onPressedSaveNote = async () => {

    try {
      await axios.put(`http://localhost:4000/owners/${currentOwner}/notes`, formData);
      console.log("Note added Sucessfully");

      navigation.navigate("listOfNotes");
      getOwnerData(currentOwner).then(res => setOwnerData(res.data)).catch(err => console.log(err));

    } catch (error) {
      console.error(error);
    }
  }


  return (
    <View style={styles.container}>
      <TextInput
        value={formData.title}
        onChangeText={(text) => { setFormData({ ...formData, title: text }) }}
        placeholder="title  -Orders"
        style={styles.inputField}
      />
      <TextInput
        value={formData.comment}
        onChangeText={(text) => { setFormData({ ...formData, comment: text }) }}
        placeholder="Comment -more orders next week"
        style={styles.inputField}
      />

      {/* Button for update/save foodItem */}
      <TouchableOpacity style={styles.detailsButton}>
        <Entypo style={styles.detailsButtonText} onPress={onPressedSaveNote} name="save" size={35} />
      </TouchableOpacity>

    </View>

  )
}

export default AddNote;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F4FE',
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