// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import morgan from "morgan";
// import cookieParser from "cookie-parser";
// import { fileURLToPath } from "url";
// import { dirname, join } from "path";
// import { networkInterfaces } from "os";

// import doctorRoutes from "./routes/doctor.routes.js";
// import videoRoutes from "./routes/video.routes.js";

// dotenv.config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const app = express();
// const PORT = process.env.PORT || 5001;

// /* ================================
//    ✅ CORS - ALLOW ALL LOCAL NETWORK IPs
//    ================================ */
// const allowedOrigins = [
//   // Localhost
//   "http://localhost:5173",
//   "http://localhost:3000",
//   "http://localhost:8080",
//   "http://127.0.0.1:5173",
//   "http://127.0.0.1:3000",

//   // Local network patterns (regex)
//   /^http:\/\/192\.168\.\d+\.\d+:\d+$/,
//   /^http:\/\/10\.\d+\.\d+\.\d+:\d+$/,
//   /^http:\/\/172\.(1[6-9]|2\d|3[0-1])\.\d+\.\d+:\d+$/,
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     // Allow requests with no origin
//     if (!origin) {
//       return callback(null, true);
//     }

//     // Check if the origin matches our allowed patterns
//     const isAllowed = allowedOrigins.some(pattern => {
//       if (typeof pattern === 'string') {
//         return origin === pattern;
//       } else if (pattern instanceof RegExp) {
//         return pattern.test(origin);
//       }
//       return false;
//     });

//     if (isAllowed) {
//       return callback(null, true);
//     } else {
//       // For development, you might want to allow all
//       // return callback(null, true);

//       return callback(new Error('CORS policy: Origin not allowed'), false);
//     }
//   },
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
// }));

// // Handle preflight requests

// /* ================================
//    ✅ MIDDLEWARES
//    ================================ */
// app.use(morgan("dev"));
// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ extended: true, limit: "50mb" }));
// app.use(cookieParser());

// mongoose.connect(process.env.MONGO_URI, {
//   serverSelectionTimeoutMS: 5000, // Fail fast if not connected
// })
//   .then(() => console.log("Connected to MongoDB successfully at", process.env.MONGO_URI))
//   .catch(err => {
//     console.error("MongoDB Connection Error:", err);
//     console.error("Please ensure MongoDB is running locally on port 27017");
//   });

// /* ================================
//    ✅ ROUTES
//    ================================ */
// app.get("/", (req, res) => {
//   res.json({
//     message: "E-Swastya Backend Running",
//     status: "active",
//     timestamp: new Date().toISOString(),
//     localIP: localIP,
//     port: PORT,
//     endpoints: {
//       health: "/api/health",
//       videoToken: "POST /api/video/token",
//       doctor: "/api/doctor",
//       patient: "/api/patient"
//     }
//   });
// });

// // Health check endpoint
// app.get("/api/health", (req, res) => {
//   res.json({
//     status: "healthy",
//     serverTime: new Date().toISOString(),
//     database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
//     localIP: localIP,
//     port: PORT
//   });
// });

// // Test endpoint for network connectivity
// app.get("/api/network-test", (req, res) => {
//   res.json({
//     message: "Network test successful!",
//     yourIP: req.ip,
//     serverIP: localIP,
//     timestamp: new Date().toISOString()
//   });
// });

// app.use("/api/doctor", doctorRoutes);

// import patientRoutes from "./routes/patient.routes.js";
// app.use("/api/patient", patientRoutes);

// async function startServer() {
//   try {
//     console.log("MONGO_URI IN USE:", process.env.MONGO_URI);

//     await mongoose.connect(process.env.MONGO_URI, {
//       serverSelectionTimeoutMS: 5000,
//     });

//     console.log("MongoDB connected successfully");

//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   } catch (err) {
//     console.error("MongoDB connection failed. Server NOT started.");
//     console.error(err);
//     process.exit(1);
//   }
// }

// startServer();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { networkInterfaces } from "os";

import doctorRoutes from "./routes/doctor.routes.js";
import videoRoutes from "./routes/video.routes.js";
import chatbotRoutes from "./routes/chatbot.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
import sosRoutes from "./routes/sos.routes.js";


import prescriptionRoutes from "./routes/prescription.routes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

/* ================================
   ✅ CORS - ALLOW ALL LOCAL NETWORK IPs
   ================================ */
const allowedOrigins = [
  // Localhost
  "http://localhost:5174",
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:8080",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174", 
  "http://127.0.0.1:3000",
  "http://127.0.0.1:8080",


  // Local network patterns (regex)
  /^http:\/\/192\.168\.\d+\.\d+:\d+$/,
  /^http:\/\/10\.\d+\.\d+\.\d+:\d+$/,
  /^http:\/\/172\.(1[6-9]|2\d|3[0-1])\.\d+\.\d+:\d+$/,
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin
    if (!origin) {
      return callback(null, true);
    }

    // Check if the origin matches our allowed patterns
    const isAllowed = allowedOrigins.some(pattern => {
      if (typeof pattern === 'string') {
        return origin === pattern;
      } else if (pattern instanceof RegExp) {
        return pattern.test(origin);
      }
      return false;
    });

    if (isAllowed) {
      return callback(null, true);
    } else {
      // For development, you might want to allow all
      // return callback(null, true);

      return callback(new Error('CORS policy: Origin not allowed'), false);
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With","Cache-Control"],
}));

// Handle preflight requests

/* ================================
   ✅ MIDDLEWARES
   ================================ */
app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

/* ================================
   ✅ GET LOCAL IP FOR NETWORK ACCESS
   ================================ */
const getLocalIP = () => {
  const nets = networkInterfaces();

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip internal and non-IPv4 addresses
      if (net.family === "IPv4" && !net.internal) {
        return net.address;
      }
    }
  }
  return "localhost";
};

const localIP = getLocalIP();

/* ================================
   ✅ DATABASE
   ================================ */
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB Error:", err.message);
    console.log("💡 Tip: Make sure MongoDB is running locally");
  });

/* ================================
   ✅ ROUTES
   ================================ */
app.get("/", (req, res) => {
  res.json({
    message: "E-Swastya Backend Running",
    status: "active",
    timestamp: new Date().toISOString(),
    localIP: localIP,
    port: PORT,
    endpoints: {
      health: "/api/health",
      videoToken: "POST /api/video/token",
      doctor: "/api/doctor",
      patient: "/api/patient"
    }
  });
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    serverTime: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    localIP: localIP,
    port: PORT
  });
});

// Test endpoint for network connectivity
app.get("/api/network-test", (req, res) => {
  res.json({
    message: "Network test successful!",
    yourIP: req.ip,
    serverIP: localIP,
    timestamp: new Date().toISOString()
  });
});

app.use("/api/doctor", doctorRoutes);

import patientRoutes from "./routes/patient.routes.js";
app.use("/api/patient", patientRoutes);

app.use("/api/prescriptions", prescriptionRoutes);

app.use("/api/video", videoRoutes);

app.use("/api/chatbot", chatbotRoutes);

app.use("/api/appointments", appointmentRoutes);

app.use("/api/sos", sosRoutes);

import feedbackRoutes from "./routes/feedback.routes.js";
app.use("/api/feedback", feedbackRoutes);


/* ================================
   ✅ ERROR HANDLING
   ================================ */
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack })
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.path,
    method: req.method
  });
});

/* ================================
   ✅ SERVER START
   ================================ */
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log("\n" + "=".repeat(50));
  console.log("🚀 E-Swastya Backend Server Started");
  console.log("=".repeat(50));
  console.log(`📍 Local:     http://localhost:${PORT}`);
  console.log(`📍 Network:   http://${localIP}:${PORT}`);
  console.log("=".repeat(50));
  console.log("📡 Accessible from other devices on the same WiFi");
  console.log("=".repeat(50));
  console.log("\n📋 Test URLs:");
  console.log(`   • Health Check:  http://${localIP}:${PORT}/api/health`);
  console.log(`   • Network Test:  http://${localIP}:${PORT}/api/network-test`);
  console.log("\n💡 For other devices:");
  console.log(`   • Use this IP:   ${localIP}:${PORT}`);
  console.log("=".repeat(50) + "\n");
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\n🔴 Shutting down server...");
  server.close(() => {
    console.log("✅ Server closed");
    mongoose.connection.close(false, () => {
      console.log("✅ MongoDB connection closed");
      process.exit(0);
    });
  });
});
