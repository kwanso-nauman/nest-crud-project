import { Field, ObjectType } from "@nestjs/graphql";
import { Product } from "src/products/entities/product.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity({ name: 'OrderProducts' })
@ObjectType()
export class OrderProduct {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  orderId: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  productId: string

  // dates
  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  updatedAt: string;

  // relations
  @ManyToOne(() => Order, order => order.products)
  @Field(() => Order, { nullable: true })
  order: Order;

  @ManyToOne(() => Product, product => product.orders, { onDelete: "CASCADE" })
  @Field(() => Product, { nullable: true })
  product: Product;

}