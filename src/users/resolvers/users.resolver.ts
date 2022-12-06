import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Order } from 'src/orders/entities/order.entity';
import { OrdersService } from 'src/orders/services/orders.service';
import { CreateUserInput } from '../dto/create-user.input';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGraphQLGuard } from 'src/auth/jwt- auth.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly ordersService: OrdersService
  ) { }

  @Mutation(() => User)
  @UseGuards(JwtAuthGraphQLGuard)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
    return this.usersService.create(createUserInput);
  }

  // @Mutation(() => User)
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.usersService.update(updateUserInput.id, updateUserInput);
  // }

  // @Mutation(() => User)
  // removeUser(@Args('id', { type: () => Int }) id: number) {
  //   return this.usersService.remove(id);
  // }

  @Query(() => [User], { name: 'users' })
  @UseGuards(JwtAuthGraphQLGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  @UseGuards(JwtAuthGraphQLGuard)
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findOne(id);
  }

  @ResolveField(() => [Order])
  async orders(@Parent() user: User): Promise<Order[]> {
    if (user)
      return await this.ordersService.findOrdersByCustomerId(user.id);
  }

}
