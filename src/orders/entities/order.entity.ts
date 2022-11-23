import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Field, ObjectType } from "@nestjs/graphql"
import { User } from "src/users/entities/user.entity";
import { Product } from "src/products/entities/product.entity";

@Entity()
@ObjectType()
export class Order{
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
  @Field(()=>String)
  customerId: string
  
  //relationships

  @ManyToOne(()=> User, customer => customer.orders, {onDelete: 'CASCADE'})
  @Field(()=> User, {nullable:true})
  customer: User

  @ManyToMany(()=> Product, product => product.orders)
  @JoinTable()
  products: Product[]
}