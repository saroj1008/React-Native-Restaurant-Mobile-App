import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { Text, StyleSheet, Image, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons, AntDesign, MaterialIcons } from 'react-native-vector-icons';
import axios from '../../services/axios';

import RestaurantAppContext from '../../../context/RestaurantAppContext';
import getRestaurantFoodData from '../../services/getRestaurantFoodData';

// FoodItem Component for displaying a food item
const FoodItem = ({ data }) => {
    const { name, origin, price, date, image, _id } = data;
    const navigation = useNavigation();
    const { foodData, setFoodData } = useContext(RestaurantAppContext);

    // Extracting the date without the time and timezone
    const extractedDate = date.split('T')[0];


    //Function to handle the onPress event for the details button
    const onPressedDetails = () => {
        navigation.navigate("foodDetails", { name, origin, price, date, image, _id });
    }

    //Function to handle the onPress event for the delete button
    const onPressedDelete = async (id) => {
        try {
            // Send HTTP DELETE request to delete the food item
            await axios.delete(`http://localhost:4000/restaurants/6467ce1acb98898727c9d1df/foods/${id}`);
            console.log("Sucessfully deleted food item");

            // Update the food data after successful deletion
            getRestaurantFoodData().then(res => setFoodData(res)).catch(err => console.log(err));
        } catch (error) {
            console.error('Error deleting food item:', error);
        }
    }

    //Function to handle the onPress event for the edit button
    const onPressedEdit = async (id) => {
        navigation.navigate("editFood", { id, name, origin, price, date, image, _id });
    }


    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: image }} style={styles.image} />
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.name}>{name}</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.priceText}>${price}</Text>
                </View>
                <Text style={styles.origin}>{origin}</Text>
                <Text style={styles.origin}>{extractedDate}</Text>
            </View>
            <View>
                {/* Button for navigating to food details */}
                <TouchableOpacity style={styles.iconButton}>
                    <MaterialIcons style={styles.iconButtonText} onPress={onPressedDetails} name="details" size={35} />
                </TouchableOpacity>
                {/* Button for navigating to food edit */}
                <TouchableOpacity style={styles.iconButton}>
                    <AntDesign style={styles.iconButtonText} onPress={() => onPressedEdit(_id)} name="edit" size={35} />
                </TouchableOpacity>
                {/* Button for delete foodItem */}
                <TouchableOpacity style={styles.iconButton}>
                    <MaterialCommunityIcons style={styles.iconButtonText} onPress={() => { onPressedDelete(_id) }} name="delete" size={35} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default FoodItem;


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
    imageContainer: {
        marginRight: 10,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 5,
    },
    detailsContainer: {
        flex: 1,
        flexDirection: 'column',
        marginRight: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    priceContainer: {
        backgroundColor: '#FFD700',
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignSelf: 'flex-start',
        marginBottom: 5,
    },
    priceText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
    },
    origin: {
        fontSize: 20,
        color: '#888',
        marginBottom: 10,
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
