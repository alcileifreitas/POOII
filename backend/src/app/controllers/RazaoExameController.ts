import { getRepository } from "typeorm";
import RazaoExame from "../models/RazaoExame";

interface Request {
    razao: string;
}

class RazaoExameController {
    public async store({ razao }: Request): Promise<RazaoExame> {
        const razaoExameRepo = getRepository(RazaoExame);

        const Razao = razaoExameRepo.create({
            razao,
        });

        await razaoExameRepo.save(Razao);

        return Razao;
    }
}

export default RazaoExameController;
