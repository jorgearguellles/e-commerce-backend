const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const connectDB = require("./config/database");
const productRoutes = require("./routes/productRoutes");

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

// Rutas
app.use("/api/products", productRoutes);

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
const PORT = process.env.PORT || 3000;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
