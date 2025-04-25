import getConnection from '../db/database.js';

const getProductos = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query(`
            SELECT p.ProductoID, p.ProductoNombre, p.CantidadPorUnidad, p.PrecioUnitario, 
                   p.UnidadesStock, p.UnidadesPedidas, p.NivelReorden, p.Discontinuado,
                   c.CategoriaNombre
            FROM productos p
            LEFT JOIN categorias c ON p.CategoriaID = c.CategoriaID
        `);
        res.json(result);
    } catch (error) {
        console.error("Time to panic - Error 500");
    }
};

const postProducto = async (req, res) => {
    try {
        const { ProductoNombre, ProveedorID, CategoriaID, CantidadPorUnidad, PrecioUnitario, UnidadesStock, UnidadesPedidas, NivelReorden, Discontinuado } = req.body;
        const product = { ProductoNombre, ProveedorID, CategoriaID, CantidadPorUnidad, PrecioUnitario, UnidadesStock, UnidadesPedidas, NivelReorden, Discontinuado };
        const connection = await getConnection();
        const result = await connection.query('INSERT INTO productos SET ?', product);
        res.json(result);
    } catch (error) {
        console.error("Time to panic - Error 500");
    }
};

const getProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query('SELECT * FROM productos WHERE ProductoID = ?', id);
        res.json(result);
    } catch (error) {
        console.error("Time to panic - Error 500");
    }
};

const deleteProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query('DELETE FROM productos WHERE ProductoID = ?', id);
        res.json(result);
    } catch (error) {
        console.error("Time to panic - Error 500");
    }
};

const updateProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { ProductoNombre, ProveedorID, CategoriaID, CantidadPorUnidad, PrecioUnitario, UnidadesStock, UnidadesPedidas, NivelReorden, Discontinuado } = req.body;
        const product = { ProductoNombre, ProveedorID, CategoriaID, CantidadPorUnidad, PrecioUnitario, UnidadesStock, UnidadesPedidas, NivelReorden, Discontinuado };
        const connection = await getConnection();
        const result = await connection.query('UPDATE productos SET ? WHERE ProductoID = ?', [product, id]);
        res.json(result);
    } catch (error) {
        console.error("Time to panic - Error 500");
    }
};

export const methodHTTP = {
    getProductos,
    postProducto,
    getProducto,
    deleteProducto,
    updateProducto
};
