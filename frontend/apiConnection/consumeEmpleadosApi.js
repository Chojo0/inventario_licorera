const url = "http://localhost:5000/api/empleados";

export const obtainEmployees = async () => {
  try {
    const response = await fetch(url);
    const empleados = await response.json();
    return empleados;
  } catch (error) {
    console.error("Error al obtener empleados", error);
  }
};
