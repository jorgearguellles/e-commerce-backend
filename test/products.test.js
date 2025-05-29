const fetch = require("node-fetch");

const API_URL = "http://localhost:3000/api/products";

// Función auxiliar para imprimir resultados
const printResult = (operation, data) => {
  console.log(`\n=== ${operation} ===`);
  console.log(JSON.stringify(data, null, 2));
};

// Función para crear un producto
async function createProduct() {
  try {
    const productData = {
      name: "Smartphone XYZ",
      description: "Último modelo de smartphone",
      price: 899.99,
      stock: 20,
      category: "Electrónicos",
      images: ["https://example.com/phone.jpg"],
    };

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    const data = await response.json();
    printResult("Producto Creado", data);
    return data._id; // Retornamos el ID para usarlo en otras operaciones
  } catch (error) {
    console.error("Error al crear producto:", error);
  }
}

// Función para obtener todos los productos
async function getAllProducts() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    printResult("Todos los Productos", data);
  } catch (error) {
    console.error("Error al obtener productos:", error);
  }
}

// Función para obtener un producto por ID
async function getProductById(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();
    printResult("Producto por ID", data);
  } catch (error) {
    console.error("Error al obtener producto por ID:", error);
  }
}

// Función para actualizar un producto
async function updateProduct(id) {
  try {
    const updateData = {
      price: 799.99,
      stock: 25,
    };

    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
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
    const response = await fetch(`${API_URL}/search?q=smartphone`);
    const data = await response.json();
    printResult("Búsqueda de Productos", data);
  } catch (error) {
    console.error("Error al buscar productos:", error);
  }
}

// Función para eliminar un producto
async function deleteProduct(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();
    printResult("Producto Eliminado", data);
  } catch (error) {
    console.error("Error al eliminar producto:", error);
  }
}

// Función principal que ejecuta todas las pruebas
async function runTests() {
  console.log("Iniciando pruebas del CRUD de productos...\n");

  // Crear producto y obtener su ID
  const productId = await createProduct();

  // Esperar 1 segundo entre operaciones para mejor legibilidad
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Obtener todos los productos
  await getAllProducts();

  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Obtener producto por ID
  await getProductById(productId);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Actualizar producto
  await updateProduct(productId);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Buscar productos
  await searchProducts();

  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Eliminar producto
  await deleteProduct(productId);
}

// Ejecutar las pruebas
runTests();
