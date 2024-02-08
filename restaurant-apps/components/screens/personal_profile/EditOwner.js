import { useNavigation } from '@react-navigation/native';
import axios from '../../services/axios';
import React, { useContext, useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { Entypo } from 'react-native-vector-icons';
import { Fontisto } from 'react-native-vector-icons';

import RestaurantAppContext from '../../../context/RestaurantAppContext';
import getOwnerData from '../../services/getOwnerData';

const EditOwner = (props) => {
  const { _id, firstName, phone, lastName, email, address } = props.route.params;
  const [formData, setFormData] = useState({ firstName: firstName, lastName: lastName, phone: phone, address: address, email })

  const { setOwnerData,currentOwner } = useContext(RestaurantAppContext);
  const navigation = useNavigation();

  // router.patch('/:owner_code', ownerController.updateOwner);
  const onPressedSave = async (id) => {
    try {
      await axios.patch(`http://localhost:4000/owners/${id}`, formData);
      console.log("Owners info updateed Sucessfully");

      navigation.navigate("ownerDetails");
      getOwnerData(currentOwner).then(res => setOwnerData(res.data)).catch(err => console.log(err));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
{/* person */}
<Fontisto name="person" color={"#1D71F2"} size={180} style={{alignSelf:"center", padding:10}} />
      <TextInput
        value={formData.firstName}
        onChangeText={(text) => { setFormData({ ...formData, firstName: text }) }}
        placeholder="First Name"
        style={styles.inputField}
      />

      <TextInput
        value={formData.lastName}
        onChangeText={(text) => { setFormData({ ...formData, lastName: text }) }}
        placeholder="Last Name"
        style={styles.inputField}
      />

      <TextInput
        value={formData.email}
        placeholder="Email"
        style={styles.inputField}
      />

      <TextInput
        value={formData.phone}
        onChangeText={(text) => { setFormData({ ...formData, phone: text }) }}
        placeholder="Phone"
        style={styles.inputField}
      />

      <TextInput
        value={formData.address}
        onChangeText={(text) => { setFormData({ ...formData, address: text }) }}
        placeholder="Address"
        style={styles.inputField}
      />

      {/* Button for update/save foodItem */}
      <TouchableOpacity style={styles.detailsButton}>
        <Entypo style={styles.detailsButtonText} onPress={() => onPressedSave(_id)} name="save" size={35} />
      </TouchableOpacity>

    </View>
  )
}



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

export default EditOwner;



/* 

firstName,
lastName,

phone,
address
{firstName='',lastName='',phone='',address=''}
*/
