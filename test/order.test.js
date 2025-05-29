const fetch = require("node-fetch");

const API_URL = "http://localhost:3000/api";
let authToken;
let orderId;
let productId;

// Función auxiliar para imprimir resultados
const printResult = (title, data) => {
  console.log(`\n=== ${title} ===`);
  console.log(JSON.stringify(data, null, 2));
};

// Login y crear producto de prueba
const loginAndCreateProduct = async () => {
  try {
    // Login
    const loginResponse = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "test@example.com",
        password: "password123",
      }),
    });
    const loginData = await loginResponse.json();
    authToken = loginData.token;
    printResult("Login Exitoso", loginData);

    // Crear producto de prueba
    const productResponse = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        name: "Test Product for Order",
        description: "Test Description",
        price: 99.99,
        stock: 10,
        category: "Test Category",
        images: ["https://example.com/test.jpg"],
      }),
    });
    const productData = await productResponse.json();
    productId = productData._id;
    printResult("Producto Creado", productData);

    // Agregar producto al carrito
    const cartResponse = await fetch(`${API_URL}/cart/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        productId,
        quantity: 2,
      }),
    });
    const cartData = await cartResponse.json();
    printResult("Producto Agregado al Carrito", cartData);
  } catch (error) {
    console.error("Error en login y creación de producto:", error);
  }
};

// Crear una orden
const createOrder = async () => {
  try {
    const response = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        shippingAddress: {
          street: "Test Street",
          city: "Test City",
          state: "Test State",
          zipCode: "12345",
          country: "Test Country",
        },
        paymentMethod: "credit_card",
      }),
    });
    const data = await response.json();
    orderId = data._id;
    printResult("Orden Creada", data);
  } catch (error) {
    console.error("Error al crear orden:", error);
  }
};

// Obtener todas las órdenes del usuario
const getOrders = async () => {
  try {
    const response = await fetch(`${API_URL}/orders`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const data = await response.json();
    printResult("Órdenes Obtenidas", data);
  } catch (error) {
    console.error("Error al obtener órdenes:", error);
  }
};

// Obtener una orden específica
const getOrderById = async () => {
  try {
    const response = await fetch(`${API_URL}/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const data = await response.json();
    printResult("Orden Obtenida por ID", data);
  } catch (error) {
    console.error("Error al obtener orden por ID:", error);
  }
};

// Actualizar estado de la orden (simulando admin)
const updateOrderStatus = async () => {
  try {
    const response = await fetch(`${API_URL}/orders/${orderId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        status: "shipped",
      }),
    });
    const data = await response.json();
    printResult("Estado de Orden Actualizado", data);
  } catch (error) {
    console.error("Error al actualizar estado:", error);
  }
};

// Cancelar orden
const cancelOrder = async () => {
  try {
    const response = await fetch(`${API_URL}/orders/${orderId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const data = await response.json();
    printResult("Orden Cancelada", data);
  } catch (error) {
    console.error("Error al cancelar orden:", error);
  }
};

// Función principal que ejecuta todas las pruebas
const runTests = async () => {
  console.log("Iniciando pruebas de órdenes...\n");

  await loginAndCreateProduct();
  await new Promise((resolve) => setTimeout(resolve, 1000));

  await createOrder();
  await new Promise((resolve) => setTimeout(resolve, 1000));

  await getOrders();
  await new Promise((resolve) => setTimeout(resolve, 1000));

  await getOrderById();
  await new Promise((resolve) => setTimeout(resolve, 1000));

  await updateOrderStatus();
  await new Promise((resolve) => setTimeout(resolve, 1000));

  await cancelOrder();
};

// Ejecutar las pruebas
runTests();
