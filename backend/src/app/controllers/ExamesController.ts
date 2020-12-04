import { getRepository } from "typeorm";
import { addDays, format } from "date-fns";

import Exames from "../models/Exames";
import TipoExame from "../models/TipoExame";

interface Request {
    funcionario_id: string;
    razaoExame_id: string;
    tipoExame_id: string;
    data: Date;
    vencimento: Date;
}

class ExamesController {
    public async store({
        funcionario_id,
        razaoExame_id,
        tipoExame_id,
        data,
        vencimento,
    }: Request): Promise<Exames> {
        // const dataPassada = startOfHour(parseISO(data));
        const exameRepo = getRepository(Exames);
        // const encontrarAgendamentoMesmaData = await agendamentosRespository.findOne(
        //     { where: { data: dataPassada } }
        // );
        // if (encontrarAgendamentoMesmaData) {
        //     throw new Error("Agendamento já cadastrado para este horário");
        // }
        const tipoRepo = getRepository(TipoExame);

        const tipoExame = await tipoRepo.findOne({
            where: { id: tipoExame_id },
        });

        if (!tipoExame) {
            throw new Error("Não existe este tipo de exame");
        }
        console.log(tipoExame);
        console.log(data);

        // const result = new Date(data);
        // const vencimento = addDays(data, tipoExame.validade);
        // console.log(vencimento);

        const exames = exameRepo.create({
            funcionario_id,
            razaoExame_id,
            tipoExame_id,
            data,
            vencimento,
        });

        await exameRepo.save(exames);

        return exames;
    }
}

export default ExamesController;
