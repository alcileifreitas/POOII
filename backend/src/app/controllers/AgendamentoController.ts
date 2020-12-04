// import { getRepository } from "typeorm";
// import { startOfHour, parseISO } from "date-fns"; //ParseISO converte string para date, StartOfHour pega a hora do date e zera os min e segs
// import Agendamentos from "../models/Agendamentos";

// interface Request {
//     prestador_servico_id: string;
//     data: string;
// }

// class AgendamentosController {
//     public async store({
//         prestador_servico_id,
//         data,
//     }: Request): Promise<Agendamentos> {
//         const dataPassada = startOfHour(parseISO(data));
//         const agendamentosRespository = getRepository(Agendamentos);
//         const encontrarAgendamentoMesmaData = await agendamentosRespository.findOne(
//             { where: { data: dataPassada } }
//         );
//         if (encontrarAgendamentoMesmaData) {
//             throw new Error("Agendamento já cadastrado para este horário");
//         }
//         const agendamento = agendamentosRespository.create({
//             prestador_servico_id,
//             data: dataPassada,
//         });

//         await agendamentosRespository.save(agendamento);

//         return agendamento;
//     }
// }

// export default AgendamentosController;
