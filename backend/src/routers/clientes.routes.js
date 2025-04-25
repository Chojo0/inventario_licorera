import { Router } from 'express';
import { methodHTTP as clienteController } from '../controllers/clientes.controllers.js';

const router = Router();

router.get('/', clienteController.getClientes);
router.get('/:id', clienteController.getCliente);
router.post('/', clienteController.postCliente);
router.put('/:id', clienteController.updateCliente);
router.delete('/:id', clienteController.deleteCliente);

export default router;
