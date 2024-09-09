import { Product } from "../entities/product.entity";
import { setSeederFactory } from "typeorm-extension";

export const ProductFactory = setSeederFactory(Product, (faker) => {
    const product = new Product(); // create the instance of product entity

    // set the column values using faker
    product.name = faker.commerce.productName();
    product.price = +faker.commerce.price({ min: 1000, max: 100000 });
    product.description = faker.commerce.productDescription();
    product.featuredImage = faker.image.url();

    return product;
})