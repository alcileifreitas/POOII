import { Router } from "express";
import { getRepository } from "typeorm";

import TipoExameController from "../app/controllers/TipoExameController";
import TipoExame from "../app/models/TipoExame";
import ensureAthen from "../middlewares/ensureAuthenticated";

const tipoRouter = Router();

tipoRouter.post("/", ensureAthen, async (req, res) => {
    try {
        const { nome, validade } = req.body;
        const tipoController = new TipoExameController();
        const Tipo = await tipoController.store({
            nome,
            validade,
        });

        return res.status(200).json(Tipo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

tipoRouter.get("/", ensureAthen, async (req, res) => {
    const tipoRepo = getRepository(TipoExame);
    const Tipo = await tipoRepo.find();
    console.log(req.user);

    return res.status(200).json(Tipo);
});

tipoRouter.put("/:id", ensureAthen, async (req, res) => {
    const { nome, validade } = req.body;
    const tipoRepo = getRepository(TipoExame);
    const { id } = req.params;
    const tip = await tipoRepo.findOne(id);

    const Tipo = tipoRepo.create({
        nome,
        validade,
    });
    const respo = await tipoRepo.save({ ...tip, ...Tipo });

    return res.status(200).json(respo);
});

tipoRouter.delete("/:id", ensureAthen, async (req, res) => {
    const tipoRepo = getRepository(TipoExame);
    const { id } = req.params;
    await tipoRepo.delete(id);
    return res.status(200).send();
});

export default tipoRouter;
