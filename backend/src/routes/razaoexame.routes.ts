import { Router } from "express";
import { getRepository } from "typeorm";

import RazaoExameController from "../app/controllers/RazaoExameController";
import RazaoExames from "../app/models/RazaoExame";
import ensureAthen from "../middlewares/ensureAuthenticated";

const razaoRouter = Router();

razaoRouter.post("/", ensureAthen, async (req, res) => {
    try {
        const { razao } = req.body;
        const razaoController = new RazaoExameController();
        const Razao = await razaoController.store({
            razao,
        });

        return res.status(200).json(Razao);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

razaoRouter.get("/", ensureAthen, async (req, res) => {
    const razaoRepo = getRepository(RazaoExames);
    const Razoes = await razaoRepo.find();
    console.log(req.user);

    return res.status(200).json(Razoes);
});

razaoRouter.put("/:id", ensureAthen, async (req, res) => {
    const { razao } = req.body;
    const razaoRepo = getRepository(RazaoExames);
    const { id } = req.params;
    const raz = await razaoRepo.findOne(id);

    const Razao = razaoRepo.create({
        razao,
    });
    const respo = await razaoRepo.save({ ...raz, ...Razao });

    return res.status(200).json(respo);
});

razaoRouter.delete("/:id", ensureAthen, async (req, res) => {
    const razaoRepo = getRepository(RazaoExames);
    const { id } = req.params;
    await razaoRepo.delete(id);
    return res.status(200).send();
});

export default razaoRouter;
