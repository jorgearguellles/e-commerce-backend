const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Clave secreta para firmar los tokens JWT
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Generar token JWT
const generateToken = (user) =>
  jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, {
    expiresIn: "24h",
  });

// Registrar nuevo usuario
const register = async (userData) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) throw new Error("El email ya está registrado");
  const user = new User(userData);
  await user.save();
  const token = generateToken(user);
  return { user: user.toJSON(), token };
};

// Iniciar sesión
const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Credenciales inválidas");
  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error("Credenciales inválidas");
  if (!user.isActive) throw new Error("Usuario inactivo");
  const token = generateToken(user);
  return { user: user.toJSON(), token };
};

// Verificar token
const verifyToken = async (token) => {
  const decoded = jwt.verify(token, JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (!user || !user.isActive)
    throw new Error("Usuario no encontrado o inactivo");
  return user;
};

// Obtener perfil de usuario
const getProfile = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("Usuario no encontrado");
  return user.toJSON();
};

// Actualizar perfil de usuario
const updateProfile = async (userId, updateData) => {
  delete updateData.email;
  delete updateData.password;
  const user = await User.findByIdAndUpdate(
    userId,
    { $set: updateData },
    { new: true, runValidators: true }
  );
  if (!user) throw new Error("Usuario no encontrado");
  return user.toJSON();
};

module.exports = {
  generateToken,
  register,
  login,
  verifyToken,
  getProfile,
  updateProfile,
};
