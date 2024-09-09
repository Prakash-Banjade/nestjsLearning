import { faker } from "@faker-js/faker";
import { Category } from "../entities/category.entity"; // import the entities relative to this file not the default import containing 'src/...'
import { Product } from "../entities/product.entity";
import { User } from "../entities/user.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

export class MainSeeder implements Seeder {
    public async run(datasource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const categoryRepo = datasource.getRepository(Category);
        const productRepo = datasource.getRepository(Product);

        // initial hardcoded category data
        const initialCategories = [
            { name: "Electronics" },
            { name: "Books" },
            { name: "Clothing & Apparel" },
        ]

        // insert category data
        console.log('seeding category data...');
        const savedCategories = await categoryRepo.save(initialCategories); // this actually saves data to db

        /**
        |--------------------------------------------------
        | seed the user data using user factory
        |--------------------------------------------------
        */

        const userFactory = factoryManager.get(User);

        console.log('seeding user data...');

        const users = await userFactory.saveMany(10); // this also saves data to db

        /**
        |--------------------------------------------------
        | seed the product using product factory
        |--------------------------------------------------
        */
        const productFactory = factoryManager.get(Product);

        // since product have a foreign key reference to category, we can't directly insert the product using faker, we need to create the instance using faker and then
        // provide the category to the instance and save to db
        // To insert multiple data, we can run a loop repeating the same process.

        console.log('seeding product data...');
        
        const products = await Promise.all(
            Array(50).fill("").map(async () => {
                const product = await productFactory.save({
                    category: faker.helpers.arrayElement(savedCategories), // this will select a random category from savedCategories
                });

                return product;
            })
        )

        await productRepo.save(products);
    }
}