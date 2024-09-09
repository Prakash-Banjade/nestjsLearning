import {
    Entity,
    Tree,
    Column,
    PrimaryGeneratedColumn,
    TreeChildren,
    TreeParent,
    OneToMany,
} from "typeorm"
import { Product } from "./product.entity"

@Entity()
@Tree("closure-table", {
    closureTableName: "category_closure",
    ancestorColumnName: (column) => "ancestor_" + column.propertyName,
    descendantColumnName: (column) => "descendant_" + column.propertyName,
})
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @TreeChildren()
    children: Category[]

    @TreeParent()
    parent: Category

    @OneToMany(() => Product, (product) => product.category)
    products: Product[]
}