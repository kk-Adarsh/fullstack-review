const express = require("express");
const http = require("node:http");
const connect = require("./utils/db");
const cors = require("cors");
const socketIo = require("socket.io");
const reviewRoutes = require("./routes/reviewRoutes");

// TO Load env file
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = 8000;
app.use(cors());


const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


// Middleware to parse JSON requests
app.use(express.json());

// connect to database
connect();


io.on("connection", (socket) => {
  //console.log('a user connected', socket.id);
  socket.on("comment", (msg) => {
    // console.log('new comment received', msg);
    io.emit("new-comment", msg);
  });
});

app.set('io', io);;
app.use("/", reviewRoutes);

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
