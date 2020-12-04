import { Router } from "express";
import { getRepository } from "typeorm";
import multer from "multer";

import UsuariosController from "../app/controllers/UsuariosController";
import Usuarios from "../app/models/Usuarios";
import ensureAthen from "../middlewares/ensureAuthenticated";
import uploadConfig from "../config/upload";
import AvatarUsuariosController from "../app/controllers/AvatarUsuariosController";

const usuariosRouter = Router();

const upload = multer(uploadConfig);

usuariosRouter.post("/", async (req, res) => {
    try {
        const { nome, matricula, password } = req.body;

        const usuariosController = new UsuariosController();

        const user = await usuariosController.store({
            nome,
            matricula,
            password,
        });

        user.password = "";

        return res.status(200).json(user);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

usuariosRouter.get("/", ensureAthen, async (req, res) => {
    const usuariosRepositorio = getRepository(Usuarios);
    const user = await usuariosRepositorio.find();
    console.log(req.user);

    return res.status(200).json(user);
});

usuariosRouter.get("/:id", ensureAthen, async (req, res) => {
    const usuariosRepositorio = getRepository(Usuarios);
    const { id } = req.params;
    const user = await usuariosRepositorio.findOne(id);
    return res.status(200).json(user);
});

usuariosRouter.delete("/:id", ensureAthen, async (req, res) => {
    const usuariosRepositorio = getRepository(Usuarios);
    const { id } = req.params;
    await usuariosRepositorio.delete(id);
    return res.status(200).send();
});

usuariosRouter.patch(
    "/avatar",
    ensureAthen,
    upload.single("avatar"),
    async (req, res) => {
        try {
            const avatarUsuariosController = new AvatarUsuariosController();

            const user = await avatarUsuariosController.update({
                user_id: req.user.id,
                avatarFileName: req.file.filename,
            });

            // console.log(req.file);

            user.password = "";
            return res.json(user);
        } catch (error) {
            res.json({ error: error.message });
        }
    }
);

export default usuariosRouter;
