import prisma from "../utils/prismaClient.js";

const normalizarCep = (cep) => {
  if (cep === undefined || cep === null) return null;
  const somenteDigitos = cep.toString().match(/\d/g)?.join("") || "";
  return somenteDigitos.length === 8 ? somenteDigitos : null;
};

export default class AlunoModel {
  constructor({
    id,
    nome,
    email,
    cpf,
    telefone,
    cep,
    logradouro = null,
    localidade = null,
    uf = null,
    foto = null,
    ativo = true,
  } = {}) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.cpf = cpf;
    this.telefone = telefone;
    this.cep = cep;
    this.logradouro = logradouro;
    this.localidade = localidade;
    this.uf = uf;
    this.foto = foto;
    this.ativo = ativo;
  }

  async criar() {
    const cepNormalizado = normalizarCep(this.cep);

    return prisma.aluno.create({
      data: {
        nome: this.nome,
        email: this.email,
        cpf: this.cpf,
        telefone: this.telefone,
        cep: cepNormalizado,
        logradouro: this.logradouro,
        localidade: this.localidade,
        uf: this.uf,
        foto: this.foto,
        ativo: this.ativo,
      },
    });
  }

  async atualizar() {
    const cepNormalizado = normalizarCep(this.cep);

    return prisma.aluno.update({
      where: { id: this.id },
      data: {
        nome: this.nome,
        email: this.email,
        cpf: this.cpf,
        telefone: this.telefone,
        cep: cepNormalizado,
        logradouro: this.logradouro,
        localidade: this.localidade,
        uf: this.uf,
        foto: this.foto,
        ativo: this.ativo,
      },
    });
  }

  async deletar() {
    return prisma.aluno.delete({ where: { id: this.id } });
  }

  static async buscarTodos(filtros = {}) {
    const where = {};

    if (filtros.nome) {
      where.nome = { contains: filtros.nome, mode: "insensitive" };
    }
    if (filtros.email !== undefined) {
      where.email = { contains: filtros.email, mode: "insensitive" };
    }
    if (filtros.cpf !== undefined) {
      where.cpf = parseInt(filtros.cpf);
    }
    if (filtros.telefone !== undefined) {
      where.telefone = parseInt(filtros.telefone);
    }
    if (filtros.localidade !== undefined) {
      where.localidade = { contains: filtros.localidade, mode: "insensitive" };
    }
    if (filtros.cep !== undefined) {
      where.cep = normalizarCep(filtros.cep);
    }

    return prisma.aluno.findMany({ where });
  }

  static async buscarPorId(id) {
    const data = await prisma.aluno.findUnique({ where: { id } });
    if (!data) {
      return null;
    }
    return new AlunoModel(data);
  }
}
