import { Field } from "@nestjs/graphql";
import { Order } from "src/orders/entities/order.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string

  @Field()
  @Column()
  name: string

  @Field()
  @Column({type:"numeric", precision:10, scale:2, })
  price: number

   //dates

   @CreateDateColumn({ type: 'timestamptz', nullable: true })
   @Field({ nullable: true })
   createdAt: string;
 
   @UpdateDateColumn({ type: 'timestamptz', nullable: true })
   @Field({ nullable: true })
   updatedAt: string;
   
   //relationships

  @ManyToMany(()=> Order, order => order.products)
  orders: Order[]
}