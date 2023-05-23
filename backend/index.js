const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require('http');
const Server = require('socket.io');

const register = require("./routes/register");
const login = require("./routes/login");
const orders = require("./routes/orders");
const productsRoute = require("./routes/products");
const bookingRoutes = require('./routes/booking');
const userRoutes = require('./routes/updateUser');
const email = require("./routes/email");
const notification = require("./routes/notification");

const app = express();
require("dotenv").config();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200,
};

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cors(corsOptions));
app.use(express.json());
app.use(cors());


const server = http.createServer(app);
const io = Server(server, {
  cors: corsOptions
});
app.set('socketio', io); // Set the 'io' object in the app for route access

io.on('connection', (socket) => {
  console.log(`A user connected ${socket.id}`);
  socket.on('booking', (booking) => {
    console.log('Received booking:', booking);
    socket.broadcast.emit('new booking', booking);
    io.emit('new booking', booking);
  });
});


app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/orders", orders);
app.use("/api/products", productsRoute);
app.use('/api/booking', bookingRoutes);
app.use('/api/user', userRoutes);
app.use('/api/email', email);
app.use('/api/notification', notification);



const uri = process.env.DB_URI;
const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server running on port: ${port}...`);
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection connected"))
  .catch((error) => console.error("MongoDB connection failed:", error));
