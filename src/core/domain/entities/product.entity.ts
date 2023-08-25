import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { ShoppingCart } from "./shopping-cart.entity";
import { Tax } from "./tax.entity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    productId: number;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column()
    description: string;

    @Column()
    base_price: number;

    @JoinTable()
    @ManyToMany(() => Tax, tax => tax.products)
    taxes: Tax[];

    @JoinTable()
    @ManyToMany(() => Order, order => order.products)
    orders: Order[];

    @ManyToMany(() => ShoppingCart, cart => cart.items)
    carts: ShoppingCart[];

    @Column()
    cretedAt: Date;

    @Column()
    updatedAt: Date;
}
