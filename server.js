// First you need to initialize express by requiring it
const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const e = require("express");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const id = require("./controllers/id");
const image = require("./controllers/image");
const clarifai = require("./controllers/clarifai");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "rentan",
    password: "",
    database: "smart-brain",
  },
});

// Second you need to initialize the app by calling express

const app = express();

//  Run the middleware to parse the body of the request into json (Else you will get undefined)
app.use(express.json());

// Run the middleware to enable cors
app.use(cors());

// Fourth you need to create a route - you can use a get request
app.get("/", (req, res) => {
  res.send("success");
});

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  id.handleId(req, res, db);
});

// Create the Image Route - put request
app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

// Create a route to handle Clarifai API call
app.post("/clarifai", (req, res) => {
  clarifai.handleClarifai(req, res);
});

// Third you need to tell the app to listen to a port ie. 3000 - you can log a message

app.listen(3000, () => {
  console.log("Server is running on post 3000");
});

/*
Structure of API
/ --> res = this is working --------------(root route recieves confirmation its working)
/signin --> POST = success/fail-----------(signin route recieves user credentials and returns success/fail)
/register --> POST = user ----------------(register route recieves user credentials and returns user object)
/profile/:userId --> GET = user-----------(profile route recieves user id and returns user object)
/image --> PUT --> user ------------------(image route recieves user id and returns updated user object with count)


*/
