import axios from './axios';

const URL = "http://localhost:4000/restaurants/6467ce1acb98898727c9d1df";

//send header here

const getRestaurantFoodData = async () => {
    try {
        const response = await axios.get(URL);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default getRestaurantFoodData;
