import express from 'express';
import 'dotenv/config';
import alunoRoutes from './routes/alunoRoute.js';
import treinoRoutes from './routes/treinoRoute.js';
import auth from './utils/apiKey.js';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('🚀 API funcionando');
});

// Rotas
app.use('/alunos', auth, alunoRoutes);
app.use('/treinos', auth, treinoRoutes);

app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
