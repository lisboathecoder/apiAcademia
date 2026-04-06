import AlunoModel from "../models/AlunoModel.js";
import TreinoModel from "../models/TreinoModel.js";
import { gerarPdfAluno, gerarPdfTodos, gerarPdfTreino, gerarPdfTodosTreinos } from "../utils/pdfHelper.js";

/**
 * GET /alunos/pdf
 * @tags Alunos
 * @summary Gera relatorio PDF de todos os alunos
 * @security ApiKeyAuth
 * @description Retorna um arquivo PDF em linha com todos os alunos conforme os filtros da query.
 * @param {string} nome.query
 * @param {string} email.query
 * @param {string} cpf.query
 * @param {string} telefone.query
 * @param {string} localidade.query
 * @param {string} cep.query
 * @return 200 - PDF gerado com sucesso
 * @return 500 - Erro ao gerar relatorio de alunos
 */

export const buscarTodos = async (req, res) => {
  try {
    const registros = await AlunoModel.buscarTodos(req.query);

    if (!registros || registros.length === 0) {
      return res
        .status(200)
        .json({ message: "Nenhum relatório de aluno encontrado." });
    }

    const pdf = await gerarPdfTodos(registros);
    return res
      .set({
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="alunos.pdf"',
      })
      .send(pdf);
  } catch (error) {
    console.error("Erro ao buscar:", error);
    return res
      .status(500)
      .json({ error: "Erro ao buscar relatório de alunos." });
  }
};

/**
 * GET /alunos/{id}/pdf
 * @tags Alunos
 * @summary Gera relatorio PDF de um aluno por ID
 * @security ApiKeyAuth
 * @description Retorna um arquivo PDF em linha para o aluno informado.
 * @param {integer} id.path.required - ID do aluno
 * @return 200 - PDF gerado com sucesso
 * @return 400 - ID invalido
 * @return 404 - Aluno nao encontrado
 * @return 500 - Erro ao gerar relatorio
 */

export const relatorioPorId = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res
        .status(400)
        .json({ error: "O ID enviado não é um número válido." });
    }

    const aluno = await AlunoModel.buscarPorId(parseInt(id));

    if (!aluno) {
      return res
        .status(404)
        .json({ error: "Registro de aluno não encontrado." });
    }

    const pdf = await gerarPdfAluno(aluno);
    return res
      .set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="aluno_${id}.pdf"`,
      })
      .send(pdf);
  } catch (error) {
    console.error("Erro ao gerar relatório:", error);
    return res.status(500).json({ error: "Erro ao gerar relatório de aluno." });
  }
};

/**
 * GET /treinos/pdf
 * @tags Treinos
 * @summary Gera relatorio PDF de todos os treinos
 * @security ApiKeyAuth
 * @description Retorna um arquivo PDF em linha com todos os treinos conforme os filtros da query.
 * @param {string} nome.query
 * @param {string} categoria.query
 * @param {number} alunoId.query
 * @return 200 - PDF gerado com sucesso
 * @return 500 - Erro ao gerar relatorio de treinos
 */

export const buscarTodosTreinos = async (req, res) => {
  try {
    const registros = await TreinoModel.buscarTodos(req.query);

    if (!registros || registros.length === 0) {
      return res
        .status(200)
        .json({ message: "Nenhum relatório de treino encontrado." });
    }

    const pdf = await gerarPdfTodosTreinos(registros);
    return res
      .set({
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="treinos.pdf"',
      })
      .send(pdf);
  } catch (error) {
    console.error("Erro ao buscar:", error);
    return res
      .status(500)
      .json({ error: "Erro ao buscar relatório de treinos." });
  }
};

/**
 * GET /treinos/{id}/pdf
 * @tags Treinos
 * @summary Gera relatorio PDF de um treino por ID
 * @security ApiKeyAuth
 * @description Retorna um arquivo PDF em linha para o treino informado.
 * @param {integer} id.path.required - ID do treino
 * @return 200 - PDF gerado com sucesso
 * @return 400 - ID invalido
 * @return 404 - Treino nao encontrado
 * @return 500 - Erro ao gerar relatorio
 */

export const relatorioTreinoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res
        .status(400)
        .json({ error: "O ID enviado não é um número válido." });
    }

    const treino = await TreinoModel.buscarPorId(parseInt(id, 10));

    if (!treino) {
      return res
        .status(404)
        .json({ error: "Registro de treino não encontrado." });
    }

    const pdf = await gerarPdfTreino(treino);
    return res
      .set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="treino_${id}.pdf"`,
      })
      .send(pdf);
  } catch (error) {
    console.error("Erro ao gerar relatório:", error);
    return res.status(500).json({ error: "Erro ao gerar relatório de treino." });
  }
};