// First you need to initialize express by requiring it
import express, { json } from "express";
import bcrypt from "bcrypt-nodejs";
import cors from "cors";
import knex from "knex";
import e from "express";
import handleRegister from "./controllers/register.js";
import handleSignin from "./controllers/signin.js";
import handleId from "./controllers/id.js";
import imageHandler from "./controllers/image.js";
import handleClarifai from "./controllers/clarifai.js";

console.log("DATABASE_URL:", process.env.DATABASE_URL);

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PW,
    database: process.env.DATABASE_DB,
  },
});

// Second you need to initialize the app by calling express

const app = express();

//  Run the middleware to parse the body of the request into json (Else you will get undefined)
app.use(json());

// Run the middleware to enable cors
app.use(
  cors({
    origin: "https://brain-hssg.onrender.com",
  })
);
// Fourth you need to create a route - you can use a get request
app.get("/", (req, res) => {
  res.send("success");
});

app.post("/signin", (req, res) => {
  handleSignin(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  handleRegister(req, res, db, bcrypt);
  console.log("DATABASE_URL:", process.env.DATABASE_URL);
});

app.get("/profile/:id", (req, res) => {
  handleId(req, res, db);
});

// Create the Image Route - put request
app.put("/image", (req, res) => {
  imageHandler(req, res, db);
});

// Create a route to handle Clarifai API call
app.post("/clarifai", (req, res) => {
  handleClarifai(req, res);
});

// Third you need to tell the app to listen to a port ie. 3000 - you can log a message

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on post ${process.env.PORT}`);
});

/*
Structure of API
/ --> res = this is working --------------(root route recieves confirmation its working)
/signin --> POST = success/fail-----------(signin route recieves user credentials and returns success/fail)
/register --> POST = user ----------------(register route recieves user credentials and returns user object)
/profile/:userId --> GET = user-----------(profile route recieves user id and returns user object)
/image --> PUT --> user ------------------(image route recieves user id and returns updated user object with count)


*/
