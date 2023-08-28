import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Customer } from "./customer.entity";
import { Invoice } from "./invoice.entity";
import { PaymentMethod } from "./payment-method.entity";
import { Product } from "./product.entity";

@Entity()
@ObjectType({ description: 'Order model.'})
export class Order {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    orderId: number;

    @Column()
    @Field()
    status: string;

    @OneToOne(() => Invoice, invoice => invoice.order)
    @Field(() => Invoice)
    invoice: Invoice;

    @Field(() => Customer)
    @ManyToOne(() => Customer, customer => customer.generatedOrders)
    customer: Customer;

    @Field(() => PaymentMethod)
    @ManyToOne(() => PaymentMethod, paymentMethod => paymentMethod.orders)
    paymentMethod: PaymentMethod;

    @Field(() => [Product])
    @ManyToMany(() => Product, product => product.orders)
    products: Product[];

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}
