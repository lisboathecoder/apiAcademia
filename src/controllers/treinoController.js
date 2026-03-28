import TreinoModel from '../models/TreinoModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const { nome, alunoId, categoria } = req.body;

        if (!nome || !categoria){
            return res.status(400).json({ error: 'O campo "nome" e "categoria" são obrigatórios!' });
        }
        if (alunoId === undefined || alunoId === null) {
            return res.status(400).json({ error: 'O campo "alunoId" é obrigatório!' });
        }

        const treino = new TreinoModel({ nome, alunoId, categoria });
        const data = await treino.criar();

        return res.status(201).json({ message: 'Treino criado com sucesso!', data });
    } catch (error) {
        console.error('Erro ao criar:', error);
        return res.status(500).json({ error: 'Erro interno ao salvar o treino.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const registros = await TreinoModel.buscarTodos(req.query);

        if (!registros || registros.length === 0) {
            return res.status(200).json({ message: 'Nenhum treino encontrado.' });
        }

        return res.json(registros);
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar treinos.' });
    }
};

export const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const treino = await TreinoModel.buscarPorId(parseInt(id));

        if (!treino) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }

        return res.json({ data: treino });
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar treino.' });
    }
};

export const atualizar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const treino = await TreinoModel.buscarPorId(parseInt(id));

        if (!treino) {
            return res.status(404).json({ error: 'Treino não encontrado para atualizar.' });
        }

        if (req.body.nome !== undefined) {
            treino.nome = req.body.nome;
        }
        if (req.body.categoria !== undefined) {
            treino.estado = req.body.estado;
        }
        if (req.body.Id !== undefined) {
            treino.alunoId = parseFloat(req.body.preco);
        }

        const data = await treino.atualizar();

        return res.json({ message: `O treino ${data.nome} foi atualizado com sucesso!`, data });
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        return res.status(500).json({ error: 'Erro ao atualizar treino.' });
    }
};

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const treino = await TreinoModel.buscarPorId(parseInt(id));

        if (!treino) {
            return res.status(404).json({ error: 'Treino não encontrado para deletar.' });
        }

        await treino.deletar();

        return res.json({ message: `O treino ${treino.nome} foi deletado com sucesso!`, deletado: treino });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar treino.' });
    }
};
