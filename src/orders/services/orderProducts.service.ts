import { InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrderProduct } from "../entities/orderProduct.entity";


export class OrderProductsService {
  constructor(
    @InjectRepository(OrderProduct) private orderProductsRepository: Repository<OrderProduct>
  ) { }

  /**
   * 
   * @param id 
   * @returns products of specific order
   */
  async findProductsByOrderId(id: string): Promise<OrderProduct[]> {
    try {
      return await this.orderProductsRepository.find({
        where: {
          productId: id
        }
      });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}