import { Router } from "express";
import { getRepository } from "typeorm";

import FuncionariosController from "../app/controllers/FuncionariosController";
import Funcionarios from "../app/models/Funcionarios";
import ensureAthen from "../middlewares/ensureAuthenticated";

const funcionariosRouter = Router();

funcionariosRouter.post("/", ensureAthen, async (req, res) => {
    try {
        const { nome, cpf, funcao, telefone, email, avatar } = req.body;
        const funcionariosController = new FuncionariosController();
        const funcio = await funcionariosController.store({
            nome,
            cpf,
            funcao,
            telefone,
            email,
            avatar,
        });

        return res.status(200).json(funcio);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

funcionariosRouter.get("/", ensureAthen, async (req, res) => {
    const funcionariosRepo = getRepository(Funcionarios);
    const funcio = await funcionariosRepo.find();
    console.log(req.user);

    return res.status(200).json(funcio);
});

funcionariosRouter.get("/:id", ensureAthen, async (req, res) => {
    const usuariosRepositorio = getRepository(Funcionarios);
    const { id } = req.params;
    const user = await usuariosRepositorio.findOne(id);
    return res.status(200).json(user);
});

funcionariosRouter.put("/:id", ensureAthen, async (req, res) => {
    const { nome, cpf, funcao, telefone, email, avatar } = req.body;
    const funcRepo = getRepository(Funcionarios);
    const { id } = req.params;
    const user = await funcRepo.findOne(id);

    const funcionario = funcRepo.create({
        nome,
        cpf,
        funcao,
        telefone,
        email,
        avatar,
    });
    const respo = await funcRepo.save({ ...user, ...funcionario });

    return res.status(200).json(respo);
});

funcionariosRouter.delete("/:id", ensureAthen, async (req, res) => {
    const funcionariosRepo = getRepository(Funcionarios);
    const { id } = req.params;
    await funcionariosRepo.delete(id);
    return res.status(200).send();
});

export default funcionariosRouter;
