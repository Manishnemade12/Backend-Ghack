// import express from "express";
// import { ConnectDB } from "./Database/Db.js";
// import cors from "cors";
// import UserRoutes from "./Routes/UserRoutes.js";
// import TodoRoutes from "./Routes/ToDoRoutes.js";
// import EventRoutes from "./Routes/EventRoutes.js";
// import NotesRoutes from "./Routes/NotesRoutes.js";
// import { TimerSessionRoutes } from "./Routes/TimerSessionsRoutes.js";
// import FriendsRoutes from "./Routes/FriendsRoutes.js";
// import dotenv from "dotenv";
// import bodyParser from "body-parser";
// import cookieParser from "cookie-parser";
// import { Server } from "socket.io";

// dotenv.config();
// const app = express();
// const port = 3000;

// const corsOptions = {
//   origin: "https://frontend-ghack-xggv.vercel.app/",
//   credentials: true, // Allow cookies and credentials
// };

// // Middleware to handle JSON data
// app.use(express.json());
// app.use(cors(corsOptions));
// app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));

// // Example route
// app.get("/", (req, res) => {
//   res.send("Hello, World!");
// });

// app.use("/", UserRoutes);
// app.use("/todo", TodoRoutes);
// app.use("/note", NotesRoutes);
// app.use("/events", EventRoutes);
// app.use("/", TimerSessionRoutes);
// app.use("/friends", FriendsRoutes);

// // Start Express server and integrate Socket.io
// const server = app.listen(port, () => {
//   ConnectDB();
//   console.log(`Server running at http://localhost:${port}`);
// });

// // Attach Socket.io to the existing Express server
// const io = new Server(server, {
//   cors: {
//     origin: "https://frontend-ghack-xggv.vercel.app/",
//     methods: ["GET", "POST"]
//   }
// });

// // Socket.io logic
// io.on("connection", (socket) => {
//   console.log(`User connected: ${socket.id}`);

//   socket.on("message", (data) => {
//     console.log("Received:", data);
//     io.emit("message", data); 
//   });

//   socket.on("disconnect", () => {
//     console.log(`User disconnected: ${socket.id}`);
//   });
// });

import express from "express";
import { ConnectDB } from "./Database/Db.js";
import cors from "cors";
import UserRoutes from "./Routes/UserRoutes.js";
import TodoRoutes from "./Routes/ToDoRoutes.js";
import EventRoutes from "./Routes/EventRoutes.js";
import NotesRoutes from "./Routes/NotesRoutes.js";
import { TimerSessionRoutes } from "./Routes/TimerSessionsRoutes.js";
import FriendsRoutes from "./Routes/FriendsRoutes.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000; // ✅ Render ke liye PORT fix

// ✅ CORS configuration
const corsOptions = {
  origin: "https://frontend-ghack-xggv.vercel.app", // ✅ Correct format
  credentials: true, // Allow cookies & credentials
};

// ✅ Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Debugging: Request Headers Check (Optional)
app.use((req, res, next) => {
  console.log("Request from:", req.headers.origin);
  next();
});

// ✅ Routes
app.get("/", (req, res) => {
  res.send("Hello, World! Backend is Running!");
});

app.use("/", UserRoutes);
app.use("/todo", TodoRoutes);
app.use("/note", NotesRoutes);
app.use("/events", EventRoutes);
app.use("/", TimerSessionRoutes);
app.use("/friends", FriendsRoutes);

// ✅ Start Express server
const server = app.listen(port, () => {
  ConnectDB();
  console.log(`✅ Server running at PORT ${port}`);
});

// ✅ Attach Socket.io with Proper CORS
const io = new Server(server, {
  cors: {
    origin: "https://frontend-ghack-xggv.vercel.app", // ✅ Correct format
    methods: ["GET", "POST"]
  }
});

// ✅ Socket.io Logic
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("message", (data) => {
    console.log("Received:", data);
    io.emit("message", data); 
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

