import express from 'express';
import 'dotenv/config';
import alunoRoutes from './routes/alunoRoute.js';
import fotoRoutes from './routes/fotoRoute.js';
import pdfRoutes from './routes/pdfRoute.js';
import treinoPdfRoutes from './routes/treinoPdfRoute.js';
import treinoRoutes from './routes/treinoRoute.js';
import docApiSwaggger from 'express-jsdoc-swagger';
import auth from './utils/apiKey.js';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

docApiSwaggger(app)({
    info: {
        title: 'API de Exemplo',
        version: '1.0.0',
        description: 'API de exemplo para documentação com Swagger'
    },
    security: {
        ApiKeyAuth: {
            type: 'apiKey',
            in: 'header',
            name: 'x-api-key',
            description: 'Chave da API enviada no header x-api-key.'
        },
    },
    baseDir: import.meta.dirname,
    filesPattern: './**/*.js',
    swaggerUIPath: '/api-docs',
    exposeSwaggerUI: true,
    exposeApiDocs: true,
    apiDocsPath: '/api-docs.json',
});

app.get('/', (req, res) => {
    res.send('🚀 API funcionando');
});

// Rotas
app.use('/alunos', auth, pdfRoutes);
app.use('/alunos', auth, fotoRoutes);
app.use('/alunos', auth, alunoRoutes);
app.use('/treinos', auth, treinoPdfRoutes);
app.use('/treinos', auth, treinoRoutes);

app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
