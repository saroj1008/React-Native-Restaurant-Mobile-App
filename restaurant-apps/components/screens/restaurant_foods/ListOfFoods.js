import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, FlatList, TextInput, Button, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


// Import FoodItem Component to display each food element in the list
import FoodItem from './FoodItem';

import RestaurantAppContext from '../../../context/RestaurantAppContext';
import { useNavigation } from '@react-navigation/native';


// ListOfFoods Component to display all the food list/ items
const ListOfFoods = () => {
    // Accessing foodData and setFoodData from RestaurantAppContext
    const { foodData, setFoodData } = useContext(RestaurantAppContext);
    const [searchText, setSearchText] = useState('');
    const [searchFoodData, setSearchFoodData] = useState([]);


    useEffect(() => {
        // Filter foodData based on searchText and update searchFoodData
        const filterdSearchData = [...foodData].filter(food => food.name.toLowerCase().includes(searchText.toLowerCase()));
        setSearchFoodData(filterdSearchData);
    }, [searchText, foodData])

    const navigation = useNavigation();
    const onPressedAddFood = () => {
        // Navigate to the "addFood" screen
        navigation.navigate("addFood");
    }


    // function to handle onTextChange
    const handleOnchangeText = (text) => {
        // Update searchText when the user types in the search bar
        setSearchText(text)
    };


    return (
        <SafeAreaView>
            <View style={styles.addSearchContainer}>
                <TextInput placeholder='Search food' style={styles.searhBar} onChangeText={handleOnchangeText} />
                <Button title="Add Food" style={styles.buttonText} onPress={onPressedAddFood} />
            </View>
            <FlatList
                data={searchFoodData}
                renderItem={({ item }) => (
                    // Render each food item using the FoodItem component
                    <FoodItem data={{ name: item.name, origin: item.origin, price: item.price, date: item.date, image: item.image, _id: item._id }} />
                )}
                keyExtractor={item => item._id}
            />
        </SafeAreaView>
    )
}

export default ListOfFoods;


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#2196F3',
        borderRadius: 20,
        paddingVertical: 6,
        paddingHorizontal: 15,
        alignSelf: 'flex-start',
        margin: 1,
    },

    buttonText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
    },

    searhBar: {
        fontSize: 16,
        borderWidth: 2,
        borderColor: "#FFCD00",
        backgroundColor: "white",
        padding: 10,
        width: "100%"

    },

    addSearchContainer: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: 'space-between'
    }
});
