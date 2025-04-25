const url = "http://localhost:5000/api/clientes";

export const obtainClients = async () => {
  try {
    const response = await fetch(url);
    const clientes = await response.json();
    return clientes;
  } catch (error) {
    console.error("Error al obtener clientes", error);
  }
};
