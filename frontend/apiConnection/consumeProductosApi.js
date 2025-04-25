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
