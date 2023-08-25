import { Field, ID, ObjectType } from "@nestjs/graphql";
import { json } from "stream/consumers";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { PaymentMethod } from "./payment-method.entity";
import { ShoppingCart } from "./shopping-cart.entity";

@Entity()
@ObjectType({ description: 'Customer model'})
export class Customer {
    @PrimaryGeneratedColumn()
    @Field(() => ID, { description: 'A unique identifier' })
    customerId: number;

    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column()
    email: string;

    @OneToOne(() => ShoppingCart, cart => cart.customer)
    cart: ShoppingCart;

    @OneToMany(() => PaymentMethod, paymentMethod => paymentMethod.customer)
    paymentMethods: PaymentMethod[];

    @OneToMany(() => Order, order => order.customer)
    generatedOrders: Order[];

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}
