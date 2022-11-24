import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateProductInput } from "../dto/create-product.input";
import { Product } from "../entities/product.entity";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>
  ) { }

  /**
   * creates product based on type defined of param
   * @param CreateProductInput 
   * @returns new product object
   */
  async create(CreateProductInput: CreateProductInput): Promise<Product> {
    try {
      const newProduct = this.productsRepository.create(CreateProductInput);
      return this.productsRepository.save(newProduct);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  /**
   * @returns array of all products
   */
  async findAll(): Promise<Product[]> {
    try {
      return await this.productsRepository.find();
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  /**
   * @param id 
   * @returns one single product matched on id
   */
  async findOne(id: string): Promise<Product> {
    try {
      return await this.productsRepository.findOneOrFail({ where: { id } });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }


}