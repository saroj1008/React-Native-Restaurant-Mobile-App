const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
  name: { type: String, required: true },
  origin: { type: String },
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  image: { type: String },
  category: { type: String },
  description: { type: String },
});

const RestaurantSchema = new Schema({
  restaurantName: { type: String, required: true },
  phone: { type: String, required: true },
  foods: [FoodSchema],
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);


// {
//   "restaurantName": "Delicious Delights",
//   "phone": "1234567890",
//   "foods": [
//     {
//       "name": "Burger",
//       "origin": "USA",
//       "price": 10.99,
//       "date": "2023-05-19T12:34:56Z",
//       "image": "burger.jpg",
//       "category": "Fast Food",
//       "description": "A delicious burger with all the fixings"
//     },
//     {
//       "name": "Pizza",
//       "origin": "Italy",
//       "price": 12.99,
//       "date": "2023-05-18T09:00:00Z",
//       "image": "pizza.jpg",
//       "category": "Italian",
//       "description": "Authentic Italian pizza with a variety of toppings"
//     }
//   ]
// }
