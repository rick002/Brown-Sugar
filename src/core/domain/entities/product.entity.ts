import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Order } from "./order.entity";
import { ShoppingCart } from "./shopping-cart.entity";
import { Tax } from "./tax.entity";

@Entity()
@ObjectType({ description: 'Product model.'})
export class Product {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    productId: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    type: string;

    @Field()
    @Column()
    description: string;

    @Field()
    @Column()
    base_price: number;

    @Field()
    @Column()
    stock: number;

    @Field(() => [Tax])
    @JoinTable()
    @ManyToMany(() => Tax, tax => tax.products)
    taxes: Tax[];

    @Field(() => [Order])
    @JoinTable()
    @ManyToMany(() => Order, order => order.products)
    orders: Order[];

    @Field(() => [ShoppingCart])
    @ManyToMany(() => ShoppingCart, cart => cart.items)
    carts: ShoppingCart[];

    @Field()
    @CreateDateColumn()
    cretedAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}
