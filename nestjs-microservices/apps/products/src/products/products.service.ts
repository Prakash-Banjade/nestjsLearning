import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  private products: (CreateProductDto & {
    id: number;
  })[] = [
      {
        id: 1,
        name: 'Product 1',
        description: 'Product 1 description',
        price: 10,
        stock: 100,
        rating: 4.5
      },
      {
        id: 2,
        name: 'Product 2',
        description: 'Product 2 description',
        price: 20,
        stock: 200,
        rating: 3.5
      }
    ]

  create(createProductDto: CreateProductDto) {
    const newId = this.products.length + 1;
    const newProduct = { ...createProductDto, id: newId };

    this.products.push(newProduct);
    return newProduct;
  }

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const existing = this.products.find(product => product.id === id);
    if (!existing) throw new Error('Product not found');
    return existing;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const existingProduct = this.findOne(id);

    this.products = this.products.map(product => {
      if (product.id === id) {
        return { ...product, ...updateProductDto };
      }

      return product;
    });

    return existingProduct;
  }

  remove(id: number) {
    const existing = this.findOne(id);
    
    this.products.filter(product => product.id !== id);

    return existing;
  }
}
