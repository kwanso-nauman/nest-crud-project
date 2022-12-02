import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { Product } from "src/products/entities/product.entity";
import { ProductsService } from "src/products/services/products.service";
import { OrderProduct } from "../entities/orderProduct.entity";
import { OrderProductsService } from "../services/orderProducts.service";

@Resolver(() => OrderProduct)
export class OrderProductsResolver {
  constructor(
    private readonly orderProductsService: OrderProductsService,
    private readonly prodcutsService: ProductsService,
  ) { }

  //resolve fields

  @ResolveField(() => Product)
  async product(@Parent() orderProduct: OrderProduct): Promise<Product> {
    if (orderProduct?.productId) {
      const newProduct = await this.prodcutsService.findOne(orderProduct?.productId)
      return newProduct;
    }
  }

  //find products by orderId


}