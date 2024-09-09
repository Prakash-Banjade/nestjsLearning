import {
    Entity,
    Tree,
    Column,
    TreeChildren,
    TreeParent,
    OneToMany,
} from "typeorm"
import { Product } from "./product.entity"
import { BaseEntity } from "./base.entity"

@Entity()
@Tree("closure-table", {
    closureTableName: "category",
    ancestorColumnName: (column) => "ancestor_" + column.propertyName,
    descendantColumnName: (column) => "descendant_" + column.propertyName,
})
export class Category extends BaseEntity {
    @Column()
    name: string

    @TreeChildren()
    children: Category[]

    @TreeParent({ onDelete: "CASCADE" })
    parent: Category

    @OneToMany(() => Product, (product) => product.category)
    products: Product[]
}