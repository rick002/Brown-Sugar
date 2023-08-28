import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Order } from "./order.entity";
import { PaymentMethod } from "./payment-method.entity";
import { ShoppingCart } from "./shopping-cart.entity";

@Entity()
@ObjectType({ description: 'Customer model.'})
export class Customer {
    @PrimaryGeneratedColumn()
    @Field(() => ID, { description: 'A unique identifier' })
    customerId: number;

    @Column()
    @Field()
    name: string;
 
    @Column()
    @Field()
    lastname: string;

    @Column()
    @Field()
    email: string;

    @OneToOne(() => ShoppingCart, cart => cart.customer)
    @Field(() => ShoppingCart, { nullable: true })
    cart: ShoppingCart;

    @OneToMany(() => PaymentMethod, paymentMethod => paymentMethod.customer)
    @Field(() => [PaymentMethod], { nullable: true })
    paymentMethods?: PaymentMethod[];

    @OneToMany(() => Order, order => order.customer)
    @Field(() => [Order], { nullable: true })
    generatedOrders?: Order[];

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}
