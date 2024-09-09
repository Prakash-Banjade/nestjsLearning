import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity()
export class User extends BaseEntity {
    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 255 })
    password: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    avatar: string | null;
}