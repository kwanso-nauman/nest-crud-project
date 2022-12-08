import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderInput } from '../dto/create-order.input';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) { }

  /**
   * creates order based on type defined (param)
   * @param createOrderInput 
   * @returns new order object
   */
  async create(createOrderInput: CreateOrderInput): Promise<Order> {
    try {
      const newOrder = this.ordersRepository.create(createOrderInput);
      return this.ordersRepository.save(newOrder);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  /**
   * @returns all order objects
   */
  async findAll(): Promise<Order[]> {
    try {
      return await this.ordersRepository.find();
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  /**
   * matches with uuid and returns that order
   * @param id 
   * @returns one order object
   */
  async findOne(id: string): Promise<Order> {
    try {
      return await this.ordersRepository.findOneOrFail({ where: { id } });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }


  /**
 * Finds orders by customer id
 * @param id 
 * @returns orders by customer id 
 */
  async findOrdersByCustomerId(id: string): Promise<Order[]> {
    try {
      return await this.ordersRepository.find({
        where: {
          customerId: id
        }
      });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }



  // update(id: number, updateOrderInput: UpdateOrderInput) {
  //   return `This action updates a #${id} order`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} order`;
  // }
}
