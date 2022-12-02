import { Module } from '@nestjs/common';
import { OrdersService } from './services/orders.service';
import { OrdersResolver } from './resolvers/orders.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]), ProductsModule
  ],
  providers: [OrdersResolver, OrdersService],
  exports: [OrdersService]

})
export class OrdersModule { }
