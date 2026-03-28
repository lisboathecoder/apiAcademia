import express from 'express';
import * as controller from '../controllers/treinoController.js';

const router = express.Router();

router.post('/treinos', controller.criar);
router.get('/treinos', controller.buscarTodos);
router.get('/treinos/:id', controller.buscarPorId);
router.put('/treinos/:id', controller.atualizar);
router.delete('/treinos/:id', controller.deletar);

export default router;
