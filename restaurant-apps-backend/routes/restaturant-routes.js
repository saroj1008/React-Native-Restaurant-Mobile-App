const express = require('express');
const router = express.Router();

const restaurantController = require('../controllers/restaturant-controllers');

//create restaurant
router.get('/:restaurant_code', restaurantController.getAllfoods); //get all foods
router.post('/', restaurantController.createRestaurant); //Add restaurant
router.put('/:restaurant_code/foods', restaurantController.addFood); // Add new food
router.patch('/:restaurant_code/foods/:food_code', restaurantController.updateFood); // Edit food
router.delete('/:restaurant_code/foods/:food_code', restaurantController.deleteFoodItemById); // delete food


module.exports = router;
