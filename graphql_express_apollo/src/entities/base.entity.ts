import { PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, DeleteDateColumn } from 'typeorm';

export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn({ nullable: true })
    updatedAt: string;

    @DeleteDateColumn({ nullable: true })
    deletedAt: string;
}