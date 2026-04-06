import express from 'express';
import * as controller from '../controllers/pdfController.js';

const router = express.Router();

router.get('/pdf', controller.buscarTodosTreinos);
router.get('/:id/pdf', controller.relatorioTreinoPorId);

export default router;