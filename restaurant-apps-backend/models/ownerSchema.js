const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OwnerSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  notes: [
    {
      id: { type: mongoose.Schema.Types.ObjectId },
      date: { type: Date, default: Date.now },
      title: { type: String, required: true },
      comment: { type: String },
    },
  ],
});

module.exports = mongoose.model("owners", OwnerSchema);

// {
//   "firstName": "Ram",
//   "lastName": "Karki",
//   "phone": "1234567890",
//   "email": "prabhu@miu.com",
//   "password": "123",
//   "address": "123 Main St",
//   "notes": [
//     {
//       "date": "2023-05-18T09:00:00Z",
//       "title": "Momo",
//       "comment": "100 plate momo next week"
//     }
//   ]
// }
