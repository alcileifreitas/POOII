import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";

@Entity("RazaoExame")
class RazaoExame {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    razao: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default RazaoExame;
