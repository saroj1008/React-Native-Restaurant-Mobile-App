import React, { useContext, useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import { AntDesign, FontAwesome } from 'react-native-vector-icons';
import RestaurantAppContext from '../../../context/RestaurantAppContext';
import { useNavigation } from '@react-navigation/native';
import axios from '../../services/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getOwnerData from '../../services/getOwnerData';

const AddNewFood = (props) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { ownerToken, setOwnerToken, currentOwner, setCurrentOwner, setOwnerData } = useContext(RestaurantAppContext);
  const navigation = useNavigation();
  console.log("testUserSignIn", currentOwner);

  const onPressedLogin = () => {
    // Add your logic for submitting the form data



    axios.post("http://localhost:4000/auth/login", formData)
      .then(res => {
        setOwnerToken(res.data.token)
        setCurrentOwner(res.data.id);
        AsyncStorage.setItem("ownerToken", res.data.token);
        AsyncStorage.setItem("currentOwnerID", res.data.id);
        return getOwnerData(res.data.id)
      })
      .then(res => setOwnerData(res.data)).catch(err => console.log(err));
    console.log("data posted sucessfully");
  };

  const onPressedRegister = () => {
    // Add your logic for submitting the form data
    navigation.navigate("signUp")
  };


  return (
    <View style={styles.container}>
      <FontAwesome name="user-circle-o" color={"#1D71F2"} size={220} style={styles.image} />
      <Text style={styles.headerText}>User Login</Text>
      <TextInput
        value={formData.email}
        onChangeText={(text) => { setFormData({ ...formData, email: text }) }}
        placeholder="Email"
        style={styles.inputField}
      />

      <TextInput
        value={formData.password}
        onChangeText={(text) => { setFormData({ ...formData, password: text }) }}
        placeholder="Password"
        secureTextEntry={true}
        style={styles.inputField}
      />

      <View style={styles.loginContainer}>
        <TouchableOpacity style={styles.submitButton}>
          <AntDesign style={styles.submitButtonText} onPress={onPressedLogin} name="login" size={35} />
        </TouchableOpacity>
        <Text style={styles.loginText}>Login</Text>
      </View>

      <View style={styles.loginContainer}>
        <TouchableOpacity style={styles.submitButton}>
          <AntDesign style={styles.submitButtonText} onPress={onPressedRegister} name="adduser" size={35} />
        </TouchableOpacity>
        <Text style={styles.loginText}>Register</Text>
      </View>
    </View>
  );
};

export default AddNewFood;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F4FE',
  },
  image: {
    resizeMode: 'contain',
    alignSelf: 'center',
    resizeMode: 'cover',
    paddingLeft: 10,
    margin: 20
  },
  inputField: {
    margin: 10,
    padding: 10,
    height: 40,
    borderColor: '#FFCD00',
    borderWidth: 2,
    backgroundColor: 'white',
    fontSize: 30,
    width: "80%",
    alignSelf: 'center'
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
    fontSize: 40,
  },
  headerText: {
    fontSize: 14,
    color: '#1D71F2',
    fontWeight: 'bold',
    fontSize: 40,
    alignSelf: 'center'
  },
  loginText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  loginContainer: {
    marginTop: 40
  }
});
