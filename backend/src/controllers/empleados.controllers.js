import getConnection from '../db/database.js';

const getEmpleados = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query('SELECT EmpleadoID, Apellido, Nombre, Titulo, Ciudad, Pais, Telefono FROM empleados');
    res.json(result);
  } catch (error) {
    console.error("Error al obtener empleados - Error 500");
  }
};

export const methodHTTP = {
  getEmpleados
};
