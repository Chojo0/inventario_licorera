import getConnection from '../db/database.js';

/* Funcion asyncrona la cual nos devuelve la promesa de la base de datos */
const getCategorias =  async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query('SELECT CategoriaID, CategoriaNombre, Descripcion, Imagen FROM categorias');
        res.json(result);
    } catch (error) {
        console.error("Time to panic - Error 500");
        
    }     
};

const postCategoria = async (req, res) => {
    try {
        const { CategoriaNombre, Descripcion, Imagen } = req.body;
        const category = { CategoriaNombre, Descripcion, Imagen };
        const connection = await getConnection();
        const result = await connection.query('INSERT INTO categorias SET ?', category);
        res.json(result);
    } catch (error) {
        console.error("Time to panic - Error 500");
    }     
};


const getCategory =  async (req, res) => {
    try {
        console.log(req.params); 
        const {id} = req.params;
        const connection = await getConnection();
        const result = await connection.query('SELECT CategoriaID, CategoriaNombre, Descripcion, Imagen FROM categorias WHERE CategoriaID = ?', id);
        res.json(result);
    } catch (error) {
        console.error("Time to panic - Error 500");
        
    }     
};


const deleteCategory =  async (req, res) => {
    try {
        console.log("id de categoria borrada", req.params);
        const {id} = req.params;
        const connection = await getConnection();
        const result = await connection.query('DELETE FROM categorias WHERE CategoriaID = ?', id);
        res.json(result);
    } catch (error) {
        console.error("Time to panic - Error 500");
        
    }     
};

const updateCategory =  async (req, res) => {
    try {
        const {id} = req.params;
        const { CategoriaNombre, Descripcion, Imagen } = req.body;
        const category = { CategoriaNombre, Descripcion, Imagen };
        const connection = await getConnection();
        const result = await connection.query('UPDATE categorias SET ? WHERE CategoriaID = ?', [category, id]);
        res.json(result);
    } catch (error) {
        console.error("Time to panic - Error 500");
    }     
};

/* Exportamos nuestros metodos HTTP */ 
export const methodHTTP = {
    getCategorias,
    postCategoria,
    getCategory,
    deleteCategory,
    updateCategory
};