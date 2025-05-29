const fetch = require("node-fetch");

const API_URL = "http://localhost:3000/api";
let authToken;
let productId;

// Función auxiliar para imprimir resultados
const printResult = (operation, data) => {
  console.log(`\n=== ${operation} ===`);
  console.log(JSON.stringify(data, null, 2));
};

// Función para registrar un usuario y obtener token
async function registerAndLogin() {
  try {
    // Intentar iniciar sesión primero
    const loginData = {
      email: "test@example.com",
      password: "password123",
    };

    const loginResponse = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const loginResult = await loginResponse.json();

    if (loginResult.token) {
      printResult("Login Exitoso", loginResult);
      authToken = loginResult.token;
    } else {
      // Si el login falla, intentar registrar
      const registerData = {
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      };

      const registerResponse = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      const registerResult = await registerResponse.json();
      printResult("Usuario Registrado", registerResult);
      authToken = registerResult.token;
    }

    // Crear un producto para pruebas
    const productData = {
      name: "Test Product",
      description: "Test Description",
      price: 99.99,
      stock: 10,
      category: "Test Category",
      images: ["https://example.com/test.jpg"],
    };

    const productResponse = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    const productResult = await productResponse.json();
    printResult("Producto Creado", productResult);
    productId = productResult._id;
  } catch (error) {
    console.error("Error en registro/login:", error);
  }
}

// Función para obtener el carrito
async function getCart() {
  try {
    const response = await fetch(`${API_URL}/cart`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    const data = await response.json();
    printResult("Carrito Obtenido", data);
  } catch (error) {
    console.error("Error al obtener carrito:", error);
  }
}

// Función para agregar producto al carrito
async function addToCart() {
  try {
    const cartData = {
      productId,
      quantity: 2,
    };

    const response = await fetch(`${API_URL}/cart/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(cartData),
    });

    const data = await response.json();
    printResult("Producto Agregado al Carrito", data);
  } catch (error) {
    console.error("Error al agregar al carrito:", error);
  }
}

// Función para actualizar cantidad
async function updateCartItem() {
  try {
    const updateData = {
      quantity: 3,
    };

    const response = await fetch(`${API_URL}/cart/items/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(updateData),
    });

    const data = await response.json();
    printResult("Cantidad Actualizada", data);
  } catch (error) {
    console.error("Error al actualizar cantidad:", error);
  }
}

// Función para obtener el total
async function getCartTotal() {
  try {
    const response = await fetch(`${API_URL}/cart/total`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    const data = await response.json();
    printResult("Total del Carrito", data);
  } catch (error) {
    console.error("Error al obtener total:", error);
  }
}

// Función para eliminar producto del carrito
async function removeFromCart() {
  try {
    const response = await fetch(`${API_URL}/cart/items/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    const data = await response.json();
    printResult("Producto Eliminado del Carrito", data);
  } catch (error) {
    console.error("Error al eliminar del carrito:", error);
  }
}

// Función para vaciar el carrito
async function clearCart() {
  try {
    const response = await fetch(`${API_URL}/cart`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    const data = await response.json();
    printResult("Carrito Vaciado", data);
  } catch (error) {
    console.error("Error al vaciar carrito:", error);
  }
}

// Función principal que ejecuta todas las pruebas
async function runTests() {
  console.log("Iniciando pruebas del carrito...\n");

  // Registrar usuario y crear producto
  await registerAndLogin();

  // Esperar 1 segundo entre operaciones
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Obtener carrito inicial
  await getCart();

  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Agregar producto al carrito
  await addToCart();

  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Actualizar cantidad
  await updateCartItem();

  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Obtener total
  await getCartTotal();

  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Eliminar producto
  await removeFromCart();

  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Vaciar carrito
  await clearCart();
}

// Ejecutar las pruebas
runTests();
