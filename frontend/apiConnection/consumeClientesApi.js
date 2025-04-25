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

export const deleteClientById = async (id) => {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE"
    });
    return await response.json();
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
  }
};

export const getClientById = async (id) => {
  try {
    const response = await fetch(`${url}/${id}`);
    return await response.json();
  } catch (error) {
    console.error("Error al obtener cliente:", error);
  }
};