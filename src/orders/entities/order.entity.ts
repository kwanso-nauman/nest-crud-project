import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderProduct } from "./orderProduct.entity";

@Entity()
@ObjectType()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string

  //dates

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

  @Column()
  @Field(() => String)
  customerId: string

  //relationships

  @ManyToOne(() => User, customer => customer.orders)
  // @Field(()=> User, {nullable:true})
  customer: User

  @OneToMany(() => OrderProduct, orderProduct => orderProduct.product, { onDelete: "CASCADE" })
  @Field(() => [OrderProduct], { nullable: true })
  orderProduct: OrderProduct[]
}