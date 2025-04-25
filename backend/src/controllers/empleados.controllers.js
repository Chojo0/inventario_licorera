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

const getEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.query('SELECT * FROM empleados WHERE EmpleadoID = ?', id);
    res.json(result);
  } catch (error) {
    console.error("Error al obtener factura - Error 500");
  }
};

const postEmpleados = async (req, res) => {
  try {
    const empleado = req.body;
    const connection = await getConnection();
    const result = await connection.query('INSERT INTO empleados SET ?', empleado);
    res.json(result);
  } catch (error) {
    console.error("Error al crear factura - Error 500");
  }
};

const updateEmpleados = async (req, res) => {
  try {
    const { id } = req.params;
    const empleado = req.body;
    const connection = await getConnection();
    const result = await connection.query('UPDATE empleados SET ? WHERE EmpleadoID = ?', [empleado, id]);
    res.json(result);
  } catch (error) {
    console.error("Error al actualizar factura - Error 500");
  }
};

const deleteEmpleados = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.query('DELETE FROM empleados WHERE EmpleadoID = ?', id);
    res.json(result);
  } catch (error) {
    console.error("Error al eliminar factura - Error 500");
  }
};

export const methodHTTP = {
  getEmpleados,
  getEmpleado,
  postEmpleados,
  updateEmpleados,
  deleteEmpleados
};
