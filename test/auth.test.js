const fetch = require("node-fetch");

const API_URL = "http://localhost:3000/api";

// Función auxiliar para imprimir resultados
const printResult = (operation, data) => {
  console.log(`\n=== ${operation} ===`);
  console.log(JSON.stringify(data, null, 2));
};

// Variable para almacenar el token
let authToken;

// Función para registrar un usuario
async function register() {
  try {
    const registerData = {
      name: "Test User",
      email: "test@example.com",
      password: "password123",
      phone: "1234567890",
      address: {
        street: "Test Street",
        city: "Test City",
        state: "Test State",
        zipCode: "12345",
        country: "Test Country",
      },
    };

    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    });

    const data = await response.json();
    printResult("Usuario Registrado", data);
    authToken = data.token;
  } catch (error) {
    console.error("Error en registro:", error);
  }
}

// Función para iniciar sesión
async function login() {
  try {
    const loginData = {
      email: "test@example.com",
      password: "password123",
    };

    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();
    printResult("Login Exitoso", data);
    authToken = data.token;
  } catch (error) {
    console.error("Error en login:", error);
  }
}

// Función para obtener perfil
async function getProfile() {
  try {
    const response = await fetch(`${API_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    const data = await response.json();
    printResult("Perfil Obtenido", data);
  } catch (error) {
    console.error("Error al obtener perfil:", error);
  }
}

// Función para actualizar perfil
async function updateProfile() {
  try {
    const updateData = {
      name: "Updated Test User",
      phone: "0987654321",
    };

    const response = await fetch(`${API_URL}/auth/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(updateData),
    });

    const data = await response.json();
    printResult("Perfil Actualizado", data);
  } catch (error) {
    console.error("Error al actualizar perfil:", error);
  }
}

// Función principal que ejecuta todas las pruebas
async function runTests() {
  console.log("Iniciando pruebas de autenticación...\n");

  // Registrar usuario
  await register();

  // Esperar 1 segundo entre operaciones
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Iniciar sesión
  await login();

  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Obtener perfil
  await getProfile();

  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Actualizar perfil
  await updateProfile();
}

// Ejecutar las pruebas
runTests();
