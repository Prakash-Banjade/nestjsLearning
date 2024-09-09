import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Category } from "./category.entity";

@Entity()
export class Product extends BaseEntity {
    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'float' })
    price: number;

    @Column({ type: 'bit varying' })
    description: string;

    @Column({ type: 'varchar' })
    featuredImage: string;

    @ManyToOne(() => Category, category => category.products, { nullable: false, onDelete: 'RESTRICT' })
    category: Category;
}