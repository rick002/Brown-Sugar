import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./customer.entity";
import { Product } from "./product.entity";

@Entity()
export class ShoppingCart {
    @PrimaryGeneratedColumn()
    cartId: number;

    @JoinTable()
    @ManyToMany(() => Product, product => product.carts)
    items: Product[];

    @OneToOne(() => Customer, customer => customer.cart)
    customer: Customer;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}
