const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./config/swagger");

const connectDB = require("./config/database");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

// Inicializar la aplicación
const app = express();

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Rutas
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/notifications", notificationRoutes);

// Ruta básica
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to E-commerce API",
    version: "1.0.0",
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  });
});

// Puerto
const PORT = process.env.PORT;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server is running on: https://localhost:${PORT}`);
  console.log(
    `API Documentation available at https://localhost:${PORT}/api-docs`
  );
});
