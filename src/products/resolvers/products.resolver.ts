import { Query } from "@nestjs/graphql";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { CreateProductInput } from "../dto/create-product.input";
import { Product } from "../entities/product.entity";
import { ProductsService } from "../services/products.service";

@Resolver(() => Product)
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService,
  ) { }

  @Mutation(() => Product)
  createProduct(@Args('CreateProductInput') createProductInput: CreateProductInput) {
    return this.productsService.create(createProductInput);
  }

  @Query(() => [Product], { name: 'products' })
  findAll() {
    return this.productsService.findAll();
  }

  @Query(() => Product, { name: 'product' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.productsService.findOne(id);
  }

}