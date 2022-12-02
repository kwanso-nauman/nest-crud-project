import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Field, ObjectType } from "@nestjs/graphql"
import { Order } from "src/orders/entities/order.entity";

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Field()
  @Column()
  email: string;

  @Column()
  password: string

  @Field()
  @Column()
  firstName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastName: string

  @Field()
  @Column()
  phoneNumber: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  address: string;

  //dates

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

  //relationships

  @OneToMany(() => Order, order => order.customer, { onDelete: 'CASCADE' })
  @Field(() => [Order], { nullable: true })
  orders: Order[]
}
