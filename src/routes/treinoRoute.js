import express from 'express';
import * as controller from '../controllers/treinoController.js';
import { upload } from '../utils/fotoHelper.js';

const router = express.Router();

router.post('/', upload.single('foto'), controller.criar);
router.get('/', controller.buscarTodos);
router.get('/:id', controller.buscarPorId);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.deletar);

export default router;
