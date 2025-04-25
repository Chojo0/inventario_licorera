const url = "http://localhost:5000/api/productos";

export const obtainProducts = async () => {
  try {
    const response = await fetch(url);
    const productos = await response.json();
    return productos;
  } catch (error) {
    console.error("Error al obtener productos", error);
  }
};

export const getProductById = async (id) => {
  try {
    const res = await fetch(`${url}/${id}`);
    return await res.json();
  } catch (error) {
    console.error("Error al obtener el producto:", error);
  }
};

export const deleteProductById = async (id) => {
  try {
    const res = await fetch(`${url}/${id}`, {
      method: "DELETE"
    });
    return await res.json();
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
  }
};

