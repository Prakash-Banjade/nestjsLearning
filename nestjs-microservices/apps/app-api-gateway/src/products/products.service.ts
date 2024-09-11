import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCTS_SERVICE') private readonly productsClient: ClientProxy
  ) { }

  create(createProductDto: CreateProductDto) {
    return this.productsClient.send('products.create', createProductDto)
  }

  findAll() {
    return this.productsClient.send('products.findAll', {})
  }

  findOne(id: number) {
    return this.productsClient.send('products.findOne', id)
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productsClient.send('products.update', { id, ...updateProductDto })
  }

  remove(id: number) {
    return this.productsClient.send('products.delete', id)
  }
}
