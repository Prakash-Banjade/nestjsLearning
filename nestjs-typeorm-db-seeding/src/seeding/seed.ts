require('dotenv').config();

import { DataSource, DataSourceOptions } from "typeorm";
import { runSeeders, SeederOptions } from "typeorm-extension";
import { UserFactory } from "./user.factory";
import { ProductFactory } from "./product.factory";
import { CategoryFactory } from "./category.factory";
import { MainSeeder } from "./main.seeder";
import { Category } from "../entities/category.entity";
import { Product } from "../entities/product.entity";
import { User } from "../entities/user.entity";

const options: DataSourceOptions & SeederOptions = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [Category, Product, User],
    synchronize: true,
    factories: [UserFactory, ProductFactory, CategoryFactory],
    seeds: [MainSeeder]
}

const datasource = new DataSource(options);
datasource.initialize().then(async () => {
    await datasource.synchronize(true);
    await runSeeders(datasource)

    process.exit();
})