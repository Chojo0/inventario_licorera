import getConnection from '../db/database.js';

const getFacturas = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query('SELECT * FROM facturas');
    res.json(result);
  } catch (error) {
    console.error("Error al obtener facturas - Error 500");
  }
};

const getFactura = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.query('SELECT * FROM facturas WHERE FacturaID = ?', id);
    res.json(result);
  } catch (error) {
    console.error("Error al obtener factura - Error 500");
  }
};

const postFactura = async (req, res) => {
  try {
    const factura = req.body;
    const connection = await getConnection();
    const result = await connection.query('INSERT INTO facturas SET ?', factura);
    res.json(result);
  } catch (error) {
    console.error("Error al crear factura - Error 500");
  }
};

const updateFactura = async (req, res) => {
  try {
    const { id } = req.params;
    const factura = req.body;
    const connection = await getConnection();
    const result = await connection.query('UPDATE facturas SET ? WHERE FacturaID = ?', [factura, id]);
    res.json(result);
  } catch (error) {
    console.error("Error al actualizar factura - Error 500");
  }
};

const deleteFactura = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.query('DELETE FROM facturas WHERE FacturaID = ?', id);
    res.json(result);
  } catch (error) {
    console.error("Error al eliminar factura - Error 500");
  }
};

export const methodHTTP = {
  getFacturas,
  getFactura,
  postFactura,
  updateFactura,
  deleteFactura
};
