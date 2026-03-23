import 'dotenv/config';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Resetando tabela exemplo...');

    // Remove todos os registros
    // await prisma.exemplo.deleteMany();

    console.log('📦 Inserindo novos registros...');
await prisma.aluno.createMany({
    data: [
        {
            nome: 'Ana Souza',
            email: 'ana.souza@exemplo.com',
            cpf: '12345678901',
            telefone: '11911110001',
            cep: '01310100',
            logradouro: 'Av Paulista, 1000',
            localidade: 'Sao Paulo',
            uf: 'SP',
            ativo: true,
        },
        {
            nome: 'Bruno Lima',
            email: 'bruno.lima@exemplo.com',
            cpf: '12345678902',
            telefone: '11911110002',
            cep: '30140071',
            logradouro: 'Rua da Bahia, 200',
            localidade: 'Belo Horizonte',
            uf: 'MG',
            ativo: true,
        },
        {
            nome: 'Carla Mendes',
            email: 'carla.mendes@exemplo.com',
            cpf: '12345678903',
            telefone: '11911110003',
            cep: '80010000',
            logradouro: 'Rua XV de Novembro, 300',
            localidade: 'Curitiba',
            uf: 'PR',
            ativo: true,
        },
        {
            nome: 'Diego Rocha',
            email: 'diego.rocha@exemplo.com',
            cpf: '12345678904',
            telefone: '11911110004',
            cep: '40020000',
            logradouro: 'Av Sete de Setembro, 400',
            localidade: 'Salvador',
            uf: 'BA',
            ativo: true,
        },
        {
            nome: 'Elaine Costa',
            email: 'elaine.costa@exemplo.com',
            cpf: '12345678905',
            telefone: '11911110005',
            cep: '50030000',
            logradouro: 'Rua do Sol, 500',
            localidade: 'Recife',
            uf: 'PE',
            ativo: true,
        },
        {
            nome: 'Felipe Nunes',
            email: 'felipe.nunes@exemplo.com',
            cpf: '12345678906',
            telefone: '11911110006',
            cep: '69005010',
            logradouro: 'Av Eduardo Ribeiro, 600',
            localidade: 'Manaus',
            uf: 'AM',
            ativo: true,
        }
    ],
});

    console.log('✅ Seed concluído!');
}

main()
    .catch((e) => {
        console.error('❌ Erro no seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });