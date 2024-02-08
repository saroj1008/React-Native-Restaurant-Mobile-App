import React, { useContext } from 'react';
import { SafeAreaView, FlatList, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Entypo } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';

import RestaurantAppContext from '../../../context/RestaurantAppContext';
import NoteItem from './NoteItem';


const NoteList = () => {
  const { ownerData } = useContext(RestaurantAppContext);
  const notesArray = ownerData.notes;
  const navigation = useNavigation();

  // Function to add notes
  const onPressedAddNote = async () => {
    navigation.navigate("addNote");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity style={styles.iconButton}>
          <Entypo style={styles.iconButtonText} onPress={onPressedAddNote} name="add-to-list" size={35} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={notesArray}
        renderItem={({ item }) => (<NoteItem data={{ title: item.title, comment: item.comment, _id: item._id, date: item.date }} />)}
        keyExtractor={item => item._id}
      />
    </SafeAreaView>
  )
}

export default NoteList;


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E3F4FE',
    borderRadius: 10,
    flex: 1
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
  iconButtonText: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
});
