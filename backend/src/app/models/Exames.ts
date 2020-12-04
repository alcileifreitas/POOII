import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";

import Funcionarios from "./Funcionarios";
import RazaoExames from "./RazaoExame";
import TipoExames from "./TipoExame";

@Entity("Exames")
class Exames {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Funcionarios)
    @JoinColumn({ name: "funcionario_id" })
    funcionario_examinado: Funcionarios;

    @Column()
    funcionario_id: string;

    @ManyToOne(() => RazaoExames)
    @JoinColumn({ name: "razaoExame_id" })
    RazaoExame_deste_exame: RazaoExames;

    @Column()
    razaoExame_id: string;

    @ManyToOne(() => TipoExames)
    @JoinColumn({ name: "tipoExame_id" })
    TipoExame_deste_exame: TipoExames;

    @Column()
    tipoExame_id: string;

    @Column("time with time zone")
    data: Date;

    @Column("time with time zone")
    vencimento: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Exames;
