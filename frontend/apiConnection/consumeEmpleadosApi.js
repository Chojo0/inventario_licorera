const url = "http://localhost:5000/api/empleados";

export const obtainEmployees = async () => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error("Error al obtener empleados:", error);
  }
};

export const deleteEmployeeById = async (id) => {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE"
    });
    return await response.json();
  } catch (error) {
    console.error("Error al eliminar empleado:", error);
  }
};

export const getEmployeeById = async (id) => {
  try {
    const response = await fetch(`${url}/${id}`);
    return await response.json();
  } catch (error) {
    console.error("Error al obtener detalles del empleado:", error);
  }
};
