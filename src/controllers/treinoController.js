import TreinoModel from '../models/TreinoModel.js';

export const criar = async (req, res) => {
    try {
        const { nome, alunoId, categoria, descricao, foto } = req.body;

        if (!nome || !categoria || !alunoId) {
            return res.status(400).json({ error: 'Nome, categoria e alunoId são obrigatórios!' });
        }

        const treino = new TreinoModel({
            nome,
            alunoId: parseInt(alunoId),
            categoria,
            descricao,
            foto,
        });

        const data = await treino.criar();
        return res.status(201).json({ message: 'Treino criado com sucesso!', data });
    } catch (error) {
        console.error('Erro ao criar:', error);
        return res.status(500).json({ error: error.message || 'Erro interno ao salvar o treino.' });
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
        if (isNaN(id)) return res.status(400).json({ error: 'ID inválido.' });

        const treino = await TreinoModel.buscarPorId(parseInt(id));
        if (!treino) return res.status(404).json({ error: 'Treino não encontrado.' });

        if (req.body.nome !== undefined) treino.nome = req.body.nome;
        if (req.body.categoria !== undefined) treino.categoria = req.body.categoria;
        if (req.body.descricao !== undefined) treino.descricao = req.body.descricao;
        if (req.body.foto !== undefined) treino.foto = req.body.foto;

        const novoAlunoId = req.body.alunoId || req.body.Id;
        if (novoAlunoId !== undefined) {
            treino.alunoId = parseInt(novoAlunoId);
        }

        const data = await treino.atualizar();
        return res.json({ message: `O treino ${data.nome} foi atualizado!`, data });

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
