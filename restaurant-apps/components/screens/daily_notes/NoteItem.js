import axios from '../../services/axios';
import React, { useContext } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import getOwnerData from '../../services/getOwnerData';
import RestaurantAppContext from '../../../context/RestaurantAppContext';


const NoteItem = ({ data }) => {
    const { title, comment, _id, date } = data;
    const { setOwnerData, currentOwner } = useContext(RestaurantAppContext);

  // Extracting the date without the time and timezone
  const extractedDate = date.split('T')[0];


    // Function to delete note when delete event is triggered
    const onPressedDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/owners/${currentOwner}/notes/${id}`);
            console.log("Note deleted Sucessfully");
        
            getOwnerData(currentOwner).then(res => setOwnerData(res.data)).catch(err => console.log(err));
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.detailsContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{extractedDate}: {title}</Text>
                </View>
                <Text style={styles.comment}>{comment}</Text>
            </View>
            <View>
                {/* Button for deleting the notes item */}
                <TouchableOpacity style={styles.iconButton}>
                    <MaterialCommunityIcons style={styles.iconButtonText} onPress={() => { onPressedDelete(_id) }} name="delete" size={35} />
                </TouchableOpacity>

            </View>
        </View>
    )
}


export default NoteItem;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#8ECEFB',
        borderRadius: 10,
        padding: 5,
        marginTop: 10,
        marginLeft: 4,
        marginRight: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailsContainer: {
        flex: 1,
        flexDirection: 'column',
        marginRight: 10,
    },
    comment: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    titleContainer: {
        backgroundColor: '#FFD700',
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignSelf: 'flex-start',
        marginBottom: 5,
    },
    titleText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
    },
    iconButton: {
        backgroundColor: '#2196F3',
        borderRadius: 20,
        paddingVertical: 6,
        paddingHorizontal: 15,
        alignSelf: 'flex-start',
        margin: 1,
    },
    iconButtonText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
    },
});

