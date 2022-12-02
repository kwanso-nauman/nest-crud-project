import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrderProduct } from "../entities/orderProduct.entity";


export class OrderProductsService {
  constructor(
    @InjectRepository(OrderProduct) private orderProductsRepository: Repository<OrderProduct>
  ) { }

  async findProductsByOrderId(id: string): Promise<OrderProduct[]> {
    return await this.orderProductsRepository.find({
      where: {
        productId: id
      }
    });
  }
}