import { Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Field } from "@nestjs/graphql"
// import { User } from "src/user/entities/user.entity";
import { Product } from "src/products/entities/product.entity";

@Entity()
export class Order{
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string

  // @ManyToOne(()=> User, customer => customer.orders, {onDelete: 'CASCADE'})
  // customer: User

  // @ManyToMany(()=> Product, product => product.orders)
  @JoinTable()
  products: Product[]
}