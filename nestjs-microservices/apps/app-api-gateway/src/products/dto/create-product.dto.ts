import { IsNotEmpty, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    description: string;

    price: number;

    stock: number;

    rating: number;
}
