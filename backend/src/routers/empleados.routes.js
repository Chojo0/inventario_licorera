import { Router } from 'express';
import { methodHTTP as empleadosController } from '../controllers/empleados.controllers.js';

const router = Router();

router.get('/', empleadosController.getEmpleados);
router.get('/:id', empleadosController.getEmpleados);
router.post('/', empleadosController.postEmpleados);
router.put('/:id', empleadosController.updateEmpleados);
router.delete('/:id', empleadosController.deleteEmpleados);

export default router;
