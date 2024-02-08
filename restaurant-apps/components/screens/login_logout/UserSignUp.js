import React, { useContext, useState } from 'react';
import axios from '../../services/axios';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import { AntDesign, FontAwesome } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';

// import BcryptReactNative,{hash} from 'bcrypt-react-native';
// import { hash } from 'bcrypt-react-native';
// var bcrypt = require('bcryptjs');
// var salt = bcrypt.genSaltSync(10);





const UserSignUp = (props) => {
  const [formData, setFormData] = useState({ firstName: "", lastName: "", phone: "", email: "", password: "", address: "", notes: [] });

  const navigation = useNavigation();

  // const bcryptAndSetPassword = (text) => {
  //   try {
  //   const salt = bcrypt.genSaltSync(10);
  //   const hash = bcrypt.hashSync(text, salt);
  //   setFormData({ ...formData, password: hash });
  //   } catch (error) {
  //   console.error(error);
  //   }
  //   };


  // onPressed SignUP
  const onPressedSignUp = async () => {
    try {
      await axios.post("http://localhost:4000/owners", formData);
      navigation.navigate("signIn");
    } catch (error) {
      console.error(error);
    }
    console.log("test", formData);
  }


  return (
    <View style={styles.container}>
      <FontAwesome name="user-circle-o" color={"#1D71F2"} size={220} style={styles.image} />
      <Text style={styles.headerText}>User Register</Text>

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
        value={formData.phone}
        onChangeText={(text) => { setFormData({ ...formData, phone: text }) }}
        placeholder="Phone"
        style={styles.inputField}
      />

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

      {/* <TextInput
        value={formData.password}
        onChangeText={(text) => { setFormData({ ...formData, password: text }) }}
        placeholder="Password"
        secureTextEntry={true}
        style={styles.inputField}
      /> */}

      <TextInput
        value={formData.address}
        onChangeText={(text) => { setFormData({ ...formData, address: text }) }}
        placeholder="Address"
        style={styles.inputField}
      />

      <View style={styles.loginContainer}>
        <TouchableOpacity style={styles.submitButton}>
          <AntDesign style={styles.submitButtonText} onPress={onPressedSignUp} name="save" size={35} />
        </TouchableOpacity>
        <Text style={styles.loginText}>Sign Up</Text>
      </View>

    </View>
  );
};

export default UserSignUp;

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
