

require("dotenv").config()
const express = require("express");
const app = express();
const router = require("./routers/routerA");
const connectDb = require("./db/db");
const cors = require("cors");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use a single CORS configuration to handle multiple origins
app.use(cors({
  origin: ['http://localhost:5173', 'http://192.168.99.1:5173','https://todo-1-1-frontend.vercel.app/'], // Allow multiple origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Define allowed methods
  credentials: true, // Allow credentials like cookies
}));

app.get("/", (req, res) => {
  return res.send("...");
});

app.use("/api", router);
const port = process.env.PORT || 7000

connectDb().then(() => {
  app.listen(port, () => {
    console.log("Server is running on port 7000");
  });
});
