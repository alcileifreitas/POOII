import { getRepository } from "typeorm";
import path from "path";
import fs from "fs";
import Usuarios from "../models/Usuarios";

import uploadConfig from "../../config/upload";

interface Request {
    user_id: string;
    avatarFileName: string;
}

class AvatarUsuariosController {
    public async update({
        user_id,
        avatarFileName,
    }: Request): Promise<Usuarios> {
        const usuariosRepository = getRepository(Usuarios);

        const user = await usuariosRepository.findOne(user_id);
        if (!user) {
            throw new Error(
                "Somente usuarios autenticados pode alterar o avatar"
            );
        }
        if (user.avatar) {
            const userAvatarFilePath = path.join(
                uploadConfig.directory,
                user.avatar
            );
            const userAvatarFileExists = await fs.promises.stat(
                userAvatarFilePath
            );
            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath); //Apaga a imagem
            }
        }

        user.avatar = avatarFileName;
        await usuariosRepository.save(user);
        return user;
    }
}

export default AvatarUsuariosController;
