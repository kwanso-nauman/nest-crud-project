import { Field, ObjectType } from "@nestjs/graphql";
import { OrderProduct } from "src/orders/entities/orderProduct.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string

  @Field()
  @Column()
  name: string

  @Field()
  @Column({ type: "numeric", precision: 10, scale: 2, })
  price: number

  //dates

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

  //relationships

  @OneToMany(() => OrderProduct, orderProduct => orderProduct.order, { onDelete: "CASCADE" })
  @Field(() => [OrderProduct], { nullable: true })
  orderProducts: OrderProduct[]
}