import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Customer } from "./customer.entity";
import { Order } from "./order.entity";

@Entity()
@ObjectType({ description: 'Payment methods model.'})
export class PaymentMethod {
    @PrimaryGeneratedColumn()
    @Field(type => ID)
    paymentMethodId: number;

    @Column()
    @Field()
    cardNumber: string;

    @Column()
    @Field()
    expirationDate: string;

    @Column()
    @Field()
    cvv: string;
    
    @ManyToOne(() => Customer, customer => customer.paymentMethods)
    @Field(() => Customer)
    customer: Customer;

    @Field(() => [Order])
    @OneToMany(() => Order, order => order.paymentMethod)
    orders: Order[];

    @Field()
    @CreateDateColumn()
    createdAt: Date;
    
    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}
