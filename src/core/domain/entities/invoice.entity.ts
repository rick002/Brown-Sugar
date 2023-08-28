import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Order } from "./order.entity";
import { Product } from "./product.entity";

@Entity()
@ObjectType({ description: 'An Invoice model.'})
export class Invoice {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    invoiceId: number;

    @Field(() => Order)
    @OneToOne(() => Order, order => order.invoice)
    order: Order;
    
    @Field()
    @Column()
    status: string;

    @Field()
    @CreateDateColumn()
    createdAt: Date;
    
    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}
