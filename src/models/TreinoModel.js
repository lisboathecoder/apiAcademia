import prisma from '../utils/prismaClient.js';

export default class TreinoModel {
    constructor({
        id = null,
        nome,
        descricao = true,
        categoria,
        foto = null,
        aluno = null,
        alunoId = null,
    } = {}) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.categoria = categoria;
        this.foto = foto;
        this.aluno = this.aluno;
        this.alunoId = alunoId;
    }

    async criar() {
        return prisma.treino.create({
            data: {
                nome: this.nome,
                descricao: this.descricao,
                categoria: this.categoria,
                foto: this.foto,
                aluno: this.aluno,
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
                aluno: this.aluno,
                alunoId: this.alunoId,
            },
        });
    }

    async deletar() {
        return prisma.treino.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.nome) where.nome = { contains: filtros.nome, mode: 'insensitive' };
        
        if (filtros.categoria) {
            where.categoria = { in: filtros.categoria.split(',').map((c) => c.toUpperCase()) };
        }
        if (filtros.disponivel !== undefined) {
            where.disponivel = filtros.disponivel === 'true';
        }
        if (filtros.precoMin || filtros.precoMax) {
            where.preco = {};

            if (filtros.precoMin) {
                where.preco.gte = Number(filtros.precoMin);
            }

            if (filtros.precoMax) {
                where.preco.lte = Number(filtros.precoMax);
            }
        }

        return prisma.treino.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.treino.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new TreinoModel(data);
    }

    static validarCategoria(categoria) {
        const categoriaUpper = categoria.toUpperCase();
        const categoriasValidas = ['MUSCULAÇÃO', 'CARDIO', 'FUNCIONAL', 'CROSSFIT'];
        if (!categoriasValidas.includes(categoriaUpper)) {
            throw new Error(
                `Categoria inválida. Categorias aceitas: ${categoriasValidas.join(', ')}`,
            );
        }
        return categoriaUpper;
    }

    static validarNome(nome) {
        if (nome === undefined || nome === null) {
            throw new Error('O campo "nome" é obrigatório!');
        }
    }

    static validarPreco(preco) {
        if (preco <= 0) {
            throw new Error('o preço deve ser maior ou igual a 0');
        }
    }
}
