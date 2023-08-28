import { Field, ID, ObjectType } from "@nestjs/graphql";
import { CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Customer } from "./customer.entity";
import { Product } from "./product.entity";

@Entity()
@ObjectType({ description: 'A model for the shopping cart.'})
export class ShoppingCart {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    cartId: number;

    @JoinTable()
    @Field(() => [Product])
    @ManyToMany(() => Product, product => product.carts)
    items: Product[];

    @Field(() => Customer)
    @JoinColumn()
    @OneToOne(() => Customer, customer => customer.cart)
    customer: Customer;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}
