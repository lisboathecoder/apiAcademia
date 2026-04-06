import AlunoModel from "../models/AlunoModel.js";
import fs from 'fs/promises';
import { processarFoto, removerFoto } from "../utils/fotoHelper.js";

export const uploadFoto = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({ error: "Nenhuma foto enviada. Envie um arquivo de foto!" });
        };

        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: "O ID enviado não é um número válido." });
        };

        const aluno = await AlunoModel.buscarPorId(parseInt(id));

        if(!aluno) {
            removerFoto(req.file.path);
            return res.status(404).json({ error: "Registro de aluno não encontrado." }); 
        };

        if (aluno.foto) {
            await fs.unlink(aluno.foto).catch(() => {});
        };

        aluno.foto = await processarFoto(req.file.path);
        
        await aluno.atualizar();
        res.status(201).json({ message: "Foto enviada e associada ao aluno com sucesso!"});

    } catch (error) {
        console.error("Erro ao enviar foto:", error);
        res.status(500).json({ error: "Erro ao enviar foto para o aluno." });
    };
};

export const verFoto = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (isNaN(id)) {
            return res.status(400).json({ error: "O ID enviado não é um número válido." });
        }
        const aluno = await AlunoModel.buscarPorId(parseInt(id));
        
        if (!aluno) {
            return res.status(404).json({ error: "Registro de aluno não encontrado." });
        }
        if (!aluno.foto) {
            return res.status(404).json({ error: "Aluno não possui foto associada." });
        }

       return res.sendFile(aluno.foto, { root: './' });
    } catch (error) {
        console.error("Erro ao buscar foto:", error);
        res.status(500).json({ error: "Erro ao buscar foto do aluno." });
    }
}