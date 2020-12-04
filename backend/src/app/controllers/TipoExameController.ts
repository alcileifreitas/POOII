import { getRepository } from "typeorm";
import TipoExame from "../models/TipoExame";

interface Request {
    nome: string;
    validade: number;
}

class TipoExameController {
    public async store({ nome, validade }: Request): Promise<TipoExame> {
        const tipoExameRepo = getRepository(TipoExame);

        const Tipo = tipoExameRepo.create({
            nome,
            validade,
        });

        await tipoExameRepo.save(Tipo);

        return Tipo;
    }
}

export default TipoExameController;
