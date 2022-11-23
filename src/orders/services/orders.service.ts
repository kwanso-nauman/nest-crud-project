import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/services/users.service';
import { Repository } from 'typeorm';
import { CreateOrderInput } from '../dto/create-order.input';
import { UpdateOrderInput } from '../dto/update-order.input';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(Order) 
    private ordersRepository: Repository<Order>,
    private usersService: UsersService
  ) {}
  
  /**
   * creates order based on type of param
   * @param createOrderInput 
   * @returns new order object
   */
  async create(createOrderInput: CreateOrderInput): Promise<Order> {
    try{
      const newOrder = this.ordersRepository.create(createOrderInput);
      return this.ordersRepository.save(newOrder);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  /**
   * @returns all order objects
   */
  async findAll() :Promise<Order[]> {
    try{
      return this.ordersRepository.find();
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  /**
   * matches with uuid and returns that order
   * @param id 
   * @returns one order object
   */
  async findOne(id: string): Promise<Order>{
    try{
      return this.ordersRepository.findOneOrFail({where: {id}});
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  /**
   * get customer that placed this order
   * @param userId 
   * @returns user object
   */
  async getCustomer(userId: string): Promise<User> {
    try{
      return this.usersService.findOne(userId);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
  update(id: number, updateOrderInput: UpdateOrderInput) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
