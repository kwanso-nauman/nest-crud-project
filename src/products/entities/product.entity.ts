import { Field } from "@nestjs/graphql";
// import { Order } from "src/order/entities/order.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string

  @Column()
  name: string

  @Column({type:"numeric", precision:10, scale:2, })
  price: number

  // @ManyToMany(()=> Order, order => order.products)
  // orders: Order[]
}