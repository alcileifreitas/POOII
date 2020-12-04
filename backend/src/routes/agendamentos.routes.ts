// import { Router } from "express";

// import AgendamentosController from "../app/controllers/AgendamentoController";

// const agendamentosRouter = Router();

// agendamentosRouter.post("/", async (req, res) => {
//     try {
//         const { prestador_servico_id, data } = req.body;
//         const agendamentosController = new AgendamentosController();
//         const agendamento = await agendamentosController.store({
//             prestador_servico_id,
//             data,
//         });

//         return res.status(200).json(agendamento);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });

// export default agendamentosRouter;
