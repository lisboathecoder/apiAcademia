import TreinoModel from '../models/TreinoModel.js';

/**
 * @typedef {object} ReqBodyTreino
 * @property {string} nome.required
 * @property {number} alunoId.required
 * @property {string} categoria.required
 */

/**
 * POST /treinos
 * @tags Treinos
 * @summary Cria um novo registro de treino
 * @description Endpoint responsável por cadastrar um novo treino. O corpo da requisição deve conter os campos "nome", "categoria" e "alunoId".
 * @param { ReqBodyTreino } request.body.required
 * @return 201 - Treino criado com sucesso
 * @return 400 - Erro de validação (ex: campo obrigatório ausente)
 * @return 500 - Erro interno do servidor
 */

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

/**
 * GET /treinos
 * @tags Treinos
 * @summary Busca todos os registros de treino
 * @description Endpoint responsável por buscar todos os registros de treino. Aceita parâmetros de consulta para filtragem.
 * @param {string} nome.query
 * @param {string} categoria.query
 * @param {number} alunoId.query
 * @return 200 - Lista de treinos encontrados
 * @return 500 - Erro interno do servidor
 */

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

/**
 * GET /treinos/{id}
 * @tags Treinos
 * @summary Busca um registro de treino por ID
 * @description Endpoint responsável por buscar um treino específico com base no ID fornecido. O ID deve ser um número inteiro válido.
 * @param {integer} id.path - O ID do treino a ser buscado
 * @return 200 - Treino encontrado com sucesso
 * @return 400 - ID inválido ou não fornecido
 * @return 404 - Treino não encontrado
 * @return 500 - Erro interno do servidor
 */

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

        if (!treino.disponivel) {
            return res.status(400).json({ error: 'Não é permitido utilizar item indisponível' });
        }

        return res.json({ data: treino });
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar treino.' });
    }
};

/**
 * PUT /treinos/{id}
 * @tags Treinos
 * @summary Atualiza um registro de treino por ID
 * @description Endpoint responsável por atualizar um treino específico com base no ID fornecido. O ID deve ser um número inteiro válido.
 * @param {integer} id.path.required - O ID do treino a ser atualizado
 * @param { ReqBodyTreino } request.body.required
 * @return 200 - Treino atualizado com sucesso
 * @return 400 - ID inválido ou não fornecido, corpo da requisição vazio ou dados inválidos
 * @return 404 - Treino não encontrado para atualizar
 * @return 500 - Erro interno do servidor
 */

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

/**
 * DELETE /treinos/{id}
 * @tags Treinos
 * @summary Deleta um registro de treino por ID
 * @description Endpoint responsável por deletar um treino específico com base no ID fornecido. O ID deve ser um número inteiro válido.
 * @param {integer} id.path.required - O ID do treino a ser deletado
 * @return 200 - Treino deletado com sucesso
 * @return 400 - ID inválido ou não fornecido
 * @return 404 - Treino não encontrado para deletar
 * @return 500 - Erro interno do servidor
 */

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
