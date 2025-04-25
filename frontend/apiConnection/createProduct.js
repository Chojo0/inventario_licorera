const url = "http://localhost:5000/api/productos";

export const createProduct = async (producto) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(producto),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log("Producto creado:", result);
    return result;
  } catch (error) {
    console.error("Error al crear producto:", error);
  }
};
