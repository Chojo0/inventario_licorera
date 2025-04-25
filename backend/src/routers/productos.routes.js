import { Router } from 'express';
import { methodHTTP as productoController } from '../controllers/productos.controllers.js';

const router = Router();

router.get('/', productoController.getProductos);
router.post('/', productoController.postProducto);
router.get('/:id', productoController.getProducto);
router.put('/:id', productoController.updateProducto);
router.delete('/:id', productoController.deleteProducto);

export default router;
