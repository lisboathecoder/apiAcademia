import prisma from '../utils/prismaClient.js';

export default class TreinoModel {
    constructor({ id = null, nome = null, descricao = null, categoria = null, foto = null, aluno = null, alunoId = null } = {}) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.categoria = categoria;
        this.foto = foto;
        this.aluno = aluno;
        this.alunoId = alunoId;
    }

    async criar() {
        return prisma.treino.create({
            data: {
                nome: this.nome,
                descricao: this.descricao,
                categoria: this.categoria,
                foto: this.foto,
                alunoId: this.alunoId,
            },
        });
    }

    async atualizar() {
        return prisma.treino.update({
            where: { id: this.id },
            data: {
                nome: this.nome,
                descricao: this.descricao,
                categoria: this.categoria,
                foto: this.foto,
                alunoId: this.alunoId,
            },
        });
    }

    async deletar() {
        return prisma.treino.delete({
            where: { id: this.id },
        });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.nome) {
            where.nome = { contains: filtros.nome, mode: 'insensitive' };
        }
        if (filtros.categoria) {
            where.categoria = { contains: filtros.categoria, mode: 'insensitive' };
        }
        if (filtros.alunoId) {
            where.alunoId = filtros.alunoId;
        }
        return prisma.treino.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.treino.findUnique({
            where: { id },
        });
        if (!data) {
            return null;
        }
        return new TreinoModel(data);
    }
}
