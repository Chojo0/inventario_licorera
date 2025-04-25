import { Router } from 'express';
import { methodHTTP as facturaController } from '../controllers/facturas.controllers.js';

const router = Router();

router.get('/', facturaController.getFacturas);
router.get('/:id', facturaController.getFactura);
router.post('/', facturaController.postFactura);
router.put('/:id', facturaController.updateFactura);
router.delete('/:id', facturaController.deleteFactura);

export default router;
