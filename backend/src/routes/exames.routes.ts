import { Router } from "express";
import { getRepository } from "typeorm";

import ExamesController from "../app/controllers/ExamesController";
import ensureAthen from "../middlewares/ensureAuthenticated";
import Exames from "../app/models/Exames";

const examesRouter = Router();

examesRouter.post("/", async (req, res) => {
    try {
        const {
            funcionario_id,
            razaoExame_id,
            tipoExame_id,
            data,
            vencimento,
        } = req.body;
        const examesController = new ExamesController();
        const exame = await examesController.store({
            funcionario_id,
            razaoExame_id,
            tipoExame_id,
            data,
            vencimento,
        });

        return res.status(200).json(exame);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

examesRouter.get("/", ensureAthen, async (req, res) => {
    const exameRepo = getRepository(Exames);
    const exam = await exameRepo.find();
    console.log(req.user);

    return res.status(200).json(exam);
});

examesRouter.get("/:id", ensureAthen, async (req, res) => {
    const usuariosRepositorio = getRepository(Exames);
    const { id } = req.params;
    const user = await usuariosRepositorio.findOne(id);
    return res.status(200).json(user);
});

examesRouter.put("/:id", ensureAthen, async (req, res) => {
    const {
        funcionario_id,
        razaoExame_id,
        tipoExame_id,
        data,
        vencimento,
    } = req.body;
    const exameRepo = getRepository(Exames);
    const { id } = req.params;
    const ex = await exameRepo.findOne(id);

    const exam = exameRepo.create({
        funcionario_id,
        razaoExame_id,
        tipoExame_id,
        data,
        vencimento,
    });
    const respo = await exameRepo.save({ ...ex, ...exam });

    return res.status(200).json(respo);
});

examesRouter.delete("/:id", ensureAthen, async (req, res) => {
    const exameRepo = getRepository(Exames);
    const { id } = req.params;
    await exameRepo.delete(id);
    return res.status(200).send();
});

export default examesRouter;
