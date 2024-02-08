
const RestaurantSchema = require("../models/restaurantSchema");
const { ObjectId } = require('mongodb');


// 1. Create a restaurant
const createRestaurant = async (req, res) => {
    try {
        const restaurant = new RestaurantSchema(req.body);
        await restaurant.save();
        return res.status(201).json({ success: true, message: "Restaurant created successfully", data: restaurant });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


// 2.  Get all restaurant foods [{},{},....]
const getAllfoods = async (req, res) => {
    try {
        const { restaurant_code } = req.params;
        const restaurant = await RestaurantSchema.findById(restaurant_code);
        res.json(restaurant.foods);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


//3. Add a new food to a restaurant
const addFood = async (req, res) => {
    try {
        const { restaurant_code } = req.params;
        const { name, origin, price, image, category, description } = req.body;

        const restaurant = await RestaurantSchema.findById(restaurant_code);
        if (!restaurant) {
            return res.status(404).json({ success: false, message: "Restaurant not found" });
        }

        const newFood = { name, origin, price, image, category, description };

        restaurant.foods.push(newFood);
        await restaurant.save();

        res.status(201).json({ success: true, message: "Food added successfully", data: newFood });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};



//4. Update a food in a restaurant
const updateFood = async (req, res) => {
    try {
        const { restaurant_code, food_code } = req.params;
        const { name, origin, price, image, category, description } = req.body;

        const restaurant = await RestaurantSchema.findById(restaurant_code);
        if (!restaurant) {
            return res.status(404).json({ success: false, message: "Restaurant not found" });
        }

        const food = restaurant.foods.id(food_code);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }

        if (name) food.name = name;
        if (origin) food.origin = origin;
        if (price) food.price = price;
        if (image) food.image = image;
        if (category) food.category = category;
        if (description) food.description = description;

        await restaurant.save();

        res.json({ success: true, message: "Food updated successfully", data: food });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

//5. Delete a foodItem by id 
const deleteFoodItemById = async (req, res) => {
    try {
        console.log("tstngnngsdga");
        const { restaurant_code, food_code } = req.params;
        console.log("tst", food_code, restaurant_code);
        // Find the restaurant by its code
        const restaurant = await RestaurantSchema.findById(restaurant_code);

        // Check if the restaurant exists
        if (!restaurant) {
            return res.status(404).json({ success: false, message: "Restaurant not found" });
        }

        // Find the index of the food item with the specified ID
        const index = restaurant.foods.findIndex(food => food._id == food_code);
        console.log(index);
        // Check if the food item exists
        if (index === -1) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        // Remove the food item from the array
        restaurant.foods.splice(index, 1);

        // Save the updated restaurant
        await restaurant.save();

        // Return success response
        res.json({ success: true, message: "Food item deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


module.exports = {
    createRestaurant,
    getAllfoods,
    addFood,
    updateFood,
    deleteFoodItemById
}