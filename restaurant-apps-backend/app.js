const express = require("express");
const mongoose = require("mongoose");
const ownerRoute = require("./routes/owner-routes");
const restaurantRoute = require("./routes/restaturant-routes");
const authRoute = require("./routes/auth-routes");

const jwt = require('jsonwebtoken');

const cors = require('cors');
const verifyToken = require("./middlewares/verifyToken");
const app = express();
const PORT = 4000;

// Enable CORS for all routes
app.use(cors());

// Set up mongoose connection
//password:  HTza3EcEZvvnhEcm
//link: mongodb+srv://esregmi:<password>@restaurant-app-cluster.crxb1xu.mongodb.net/?retryWrites=true&w=majority

const url = "mongodb+srv://esregmi:HTza3EcEZvvnhEcm@restaurant-app-cluster.crxb1xu.mongodb.net/"
const mongoDB = url;

main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
    console.log("DB connected...");
}

// middleware
app.use(express.json());

// Router middleware

app.use('/auth', authRoute);
app.use('/owners',ownerRoute);
app.use('/restaurants', verifyToken, restaurantRoute);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});



// // Token verification middleware **

  

// // Global middleware for protected routes
// server.use(verifyToken);


