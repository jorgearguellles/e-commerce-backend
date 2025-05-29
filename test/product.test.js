const fetch = require("node-fetch");

const API_URL = "http://localhost:3000/api";
let authToken;
let productId;

// Función auxiliar para imprimir resultados
const printResult = (operation, data) => {
  console.log(`\n=== ${operation} ===`);
  console.log(JSON.stringify(data, null, 2));
};

// Función para iniciar sesión y obtener token
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

// Función para crear un producto
async function createProduct() {
  try {
    const productData = {
      name: "Test Product",
      description: "Test Description",
      price: 99.99,
      stock: 10,
      category: "Test Category",
      images: ["https://example.com/test.jpg"],
    };

    const response = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(productData),
    });

    const data = await response.json();
    printResult("Producto Creado", data);
    productId = data._id;
  } catch (error) {
    console.error("Error al crear producto:", error);
  }
}

// Función para obtener todos los productos
async function getAllProducts() {
  try {
    const response = await fetch(`${API_URL}/products`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    const data = await response.json();
    printResult("Productos Obtenidos", data);
  } catch (error) {
    console.error("Error al obtener productos:", error);
  }
}

// Función para obtener un producto por ID
async function getProductById() {
  try {
    const response = await fetch(`${API_URL}/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    const data = await response.json();
    printResult("Producto Obtenido por ID", data);
  } catch (error) {
    console.error("Error al obtener producto por ID:", error);
  }
}

// Función para actualizar un producto
async function updateProduct() {
  try {
    const updateData = {
      name: "Updated Test Product",
      price: 149.99,
    };

    const response = await fetch(`${API_URL}/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(updateData),
    });

    const data = await response.json();
    printResult("Producto Actualizado", data);
  } catch (error) {
    console.error("Error al actualizar producto:", error);
  }
}

// Función para buscar productos
async function searchProducts() {
  try {
    const response = await fetch(`${API_URL}/products/search?q=Test`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    const data = await response.json();
    printResult("Productos Encontrados", data);
  } catch (error) {
    console.error("Error al buscar productos:", error);
  }
}

// Función para eliminar un producto
async function deleteProduct() {
  try {
    const response = await fetch(`${API_URL}/products/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    const data = await response.json();
    printResult("Producto Eliminado", data);
  } catch (error) {
    console.error("Error al eliminar producto:", error);
  }
}

// Función principal que ejecuta todas las pruebas
async function runTests() {
  console.log("Iniciando pruebas de productos...\n");

  // Iniciar sesión
  await login();

  // Esperar 1 segundo entre operaciones
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Crear producto
  await createProduct();

  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Obtener todos los productos
  await getAllProducts();

  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Obtener producto por ID
  await getProductById();

  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Actualizar producto
  await updateProduct();

  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Buscar productos
  await searchProducts();

  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Eliminar producto
  await deleteProduct();
}

// Ejecutar las pruebas
runTests();
