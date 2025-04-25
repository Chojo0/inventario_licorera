import getConnection from '../db/database.js';

const getClientes = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query('SELECT ClienteID, Compania, Contacto, Titulo, Direccion, Ciudad, Regiones, CodigoPostal, Pais, Telefono, Fax FROM clientes');
    res.json(result);
  } catch (error) {
    console.error("Error al obtener clientes - Error 500");
  }
};

const getCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.query('SELECT * FROM clientes WHERE ClienteID = ?', id);
    res.json(result);
  } catch (error) {
    console.error("Error al obtener cliente - Error 500");
  }
};

const postCliente = async (req, res) => {
  try {
    const { Compania, Contacto, Titulo, Direccion, Ciudad, Regiones, CodigoPostal, Pais, Telefono, Fax } = req.body;
    const cliente = { Compania, Contacto, Titulo, Direccion, Ciudad, Regiones, CodigoPostal, Pais, Telefono, Fax };
    const connection = await getConnection();
    const result = await connection.query('INSERT INTO clientes SET ?', cliente);
    res.json(result);
  } catch (error) {
    console.error("Error al crear cliente - Error 500");
  }
};

const updateCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { Compania, Contacto, Titulo, Direccion, Ciudad, Regiones, CodigoPostal, Pais, Telefono, Fax } = req.body;
    const cliente = { Compania, Contacto, Titulo, Direccion, Ciudad, Regiones, CodigoPostal, Pais, Telefono, Fax };
    const connection = await getConnection();
    const result = await connection.query('UPDATE clientes SET ? WHERE ClienteID = ?', [cliente, id]);
    res.json(result);
  } catch (error) {
    console.error("Error al actualizar cliente - Error 500");
  }
};

const deleteCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.query('DELETE FROM clientes WHERE ClienteID = ?', id);
    res.json(result);
  } catch (error) {
    console.error("Error al eliminar cliente - Error 500");
  }
};

export const methodHTTP = {
  getClientes,
  getCliente,
  postCliente,
  updateCliente,
  deleteCliente
};
