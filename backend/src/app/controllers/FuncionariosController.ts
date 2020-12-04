import { getRepository } from "typeorm";
import Funcionarios from "../models/Funcionarios";

interface Request {
    nome: string;
    cpf: string;
    funcao: string;
    telefone: string;
    email: string;
    avatar: string;
}

class FuncionariosController {
    public async store({
        nome,
        cpf,
        funcao,
        telefone,
        email,
        avatar,
    }: Request): Promise<Funcionarios> {
        const funcionariosRepo = getRepository(Funcionarios);

        const funcionario = funcionariosRepo.create({
            nome,
            cpf,
            funcao,
            telefone,
            email,
            avatar,
        });

        await funcionariosRepo.save(funcionario);

        return funcionario;
    }
}

export default FuncionariosController;
