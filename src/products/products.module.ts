import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsResolver } from './resolvers/products.resolver';
import { ProductsService } from './services/products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product])
  ],
  providers: [ProductsResolver, ProductsService],
  exports: [ProductsService]
})
export class ProductsModule { }
