import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Customer } from "./customer.entity";
import { Order } from "./order.entity";

@Entity()
@ObjectType({ description: 'Payment methods model.'})
export class PaymentMethod {

    @PrimaryColumn()
    @Field()
    cardNumber: string;

    @Column()
    @Field()
    expirationDate: string;

    @Column()
    @Field()
    cvv: string;
    
    @ManyToOne(() => Customer, customer => customer.paymentMethods)
    @Field(() => Customer, { nullable: true })
    customer?: Customer;

    @Field(() => [Order], { nullable: true })
    @OneToMany(() => Order, order => order.paymentMethod)
    orders?: Order[];

    @Field()
    @CreateDateColumn()
    createdAt: Date;
    
    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}
