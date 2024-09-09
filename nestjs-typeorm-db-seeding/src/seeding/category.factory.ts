import { Category } from "../entities/category.entity";
import { setSeederFactory } from "typeorm-extension";

export const CategoryFactory = setSeederFactory(Category, (faker) => {
    const category = new Category(); // create the instance of category entity

    category.name = faker.commerce.productAdjective();

    return category;
})