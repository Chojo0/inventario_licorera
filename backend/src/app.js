/* importamos al framework express */
import express from 'express';
import cors from 'cors';
import categoriasRoutes from './routers/categorias.routes.js';
import productosRoutes from './routers/productos.routes.js';
import clientesRoutes from './routers/clientes.routes.js';
import empleadosRoutes from './routers/empleados.routes.js';
import facturasRoutes from './routers/facturas.routes.js';

/* asignamos a app toda la funcionalidad para el servidor web */
const app = express();

/* asignamos el middleware cors */	
app.use(cors());

/* setear el puerto del servidor web */
app.set('port', 5000);

/* configuramos el tipo de respuesta al formato json */
app.use(express.json());

/* Routers */
app.use("/api/categorias", categoriasRoutes);
app.use("/api/productos", productosRoutes);
app.use("/api/clientes", clientesRoutes);
app.use("/api/empleados", empleadosRoutes);
app.use("/api/facturas", facturasRoutes);


/* hacemos disponible a mi server app para todos los hosts */
export default app;
