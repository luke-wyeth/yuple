
require("dotenv").config()
const { MongoClient, ServerApiVersion } = require('mongodb')
const uri = process.env.MONGODB_URL

// Import the mongoose module
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

// const models = require("./models.ts")

// Wait for database to connect, logging an error if there is a problem
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(uri);
}


// var tools = require('./models.ts');
// tools.createInstance()


// express


const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Express on Vercel"));
app.get("/test", (req, res) => res.json({hello: 'hello world!2'}));



const userRouter = require('./routes/users.ts')
app.use('/user', userRouter)



app.listen(3000, () => console.log("Server ready on port 3000."));






module.exports = app;



