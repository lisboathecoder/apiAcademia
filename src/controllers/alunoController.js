import AlunoModel from "../models/AlunoModel.js";

export const criar = async (req, res) => {
  try {
    if (!req.body) {
      return res
        .status(400)
        .json({ error: "Corpo da requisição vazio. Envie os dados!" });
    }

    const {
      nome,
      email,
      cpf,
      telefone,
      cep,
      logradouro,
      localidade,
      uf,
      ativo,
    } = req.body;

    if (!nome) {
      return res.status(400).json({ error: 'O campo "nome" é obrigatório!' });
    }

    if (nome.length > 100 || nome.length < 3) {
      return res
        .status(400)
        .json({
          error:
            'O campo "nome" deve ter no mínimo 3 e no máximo 100 caracteres!',
        });
    }

    if (!email) {
      return res.status(400).json({ error: 'O campo "email" é obrigatório!' });
    }
    if (!cpf) {
      return res.status(400).json({ error: 'O campo "cpf" é obrigatório!' });
    }
    let endereco;
    if (cep) {
      endereco = await buscarEnderecoPorCep(cep);
      if (!endereco) {
        return res
          .status(400)
          .json({ error: "CEP inválido ou não encontrado." });
      }
    }

    if (!telefone) {
      return res
        .status(400)
        .json({ error: 'O campo "telefone" é obrigatório!' });
    }

    if (!cep) {
      return res.status(400).json({ error: 'O campo "cep" é obrigatório!' });
    }

    const aluno = new AlunoModel({
      nome,
      email,
      cpf,
      telefone,
      cep,
      logradouro,
      localidade,
      uf,
      ativo,
    });
    const data = await aluno.criar();

    return res
      .status(201)
      .json({ message: "Registro criado com sucesso!", data });
  } catch (error) {
    console.error("Erro ao criar:", error);
    return res
      .status(500)
      .json({ error: "Erro interno ao salvar o registro." });
  }
};

export const buscarTodos = async (req, res) => {
  try {
    const registros = await AlunoModel.buscarTodos(req.query);

    if (!registros || registros.length === 0) {
      return res.status(200).json({ message: "Nenhum registro encontrado." });
    }

    return res.json(registros);
  } catch (error) {
    console.error("Erro ao buscar:", error);
    return res.status(500).json({ error: "Erro ao buscar registros." });
  }
};

export const buscarPorId = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res
        .status(400)
        .json({ error: "O ID enviado não é um número válido." });
    }

    const aluno = await AlunoModel.buscarPorId(parseInt(id));

    if (!aluno) {
      return res.status(404).json({ error: "Registro não encontrado." });
    }

    return res.json({ data: aluno });
  } catch (error) {
    console.error("Erro ao buscar:", error);
    return res.status(500).json({ error: "Erro ao buscar registro." });
  }
};

export const atualizar = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ error: "ID inválido." });
    }

    if (!req.body) {
      return res
        .status(400)
        .json({ error: "Corpo da requisição vazio. Envie os dados!" });
    }

    const aluno = await AlunoModel.buscarPorId(parseInt(id));

    if (!aluno) {
      return res
        .status(404)
        .json({ error: "Registro não encontrado para atualizar." });
    }

    if (req.body.nome !== undefined) {
      aluno.nome = req.body.nome;
    }
    if (req.body.email !== undefined) {
      aluno.email = req.body.email;
    }
    if (req.body.cpf !== undefined) {
      aluno.cpf = req.body.cpf;
    }
    if (req.body.telefone !== undefined) {
      aluno.telefone = req.body.telefone;
    }
    if (req.body.cep !== undefined) {
      aluno.cep = req.body.cep;
    }
    if (req.body.logradouro !== undefined) {
      aluno.logradouro = req.body.logradouro;
    }
    if (req.body.localidade !== undefined) {
      aluno.localidade = req.body.localidade;
    }
    if (req.body.uf !== undefined) {
      aluno.uf = req.body.uf;
    }
    if (req.body.ativo !== undefined) {
      const isAtivo =
        req.body.ativo === true || req.body.ativo === "true" ? true : false;
      if (!isAtivo) {
        return res
          .status(400)
          .json({ error: "Não é possível atualizar o registro desativado." });
      }
      aluno.ativo = isAtivo;
    }

    const data = await aluno.atualizar();

    return res.json({
      message: `O registro "${data.nome}" foi atualizado com sucesso!`,
      data,
    });
  } catch (error) {
    console.error("Erro ao atualizar:", error);
    return res.status(500).json({ error: "Erro ao atualizar registro." });
  }
};

export const deletar = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ error: "ID inválido." });
    }

    const aluno = await AlunoModel.buscarPorId(parseInt(id));

    if (!aluno) {
      return res
        .status(404)
        .json({ error: "Registro não encontrado para deletar." });
    }

    await aluno.deletar();

    return res.json({
      message: `O registro "${aluno.nome}" foi deletado com sucesso!`,
      deletado: aluno,
    });
  } catch (error) {
    console.error("Erro ao deletar:", error);
    return res.status(500).json({ error: "Erro ao deletar registro." });
  }
};
