import { Column, Entity, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./customer.entity";
import { Invoice } from "./invoice.entity";
import { PaymentMethod } from "./payment-method.entity";
import { Product } from "./product.entity";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    orderId: number;

    @Column()
    status: string;

    @OneToOne(() => Invoice, invoice => invoice.order)
    invoice: Invoice;

    @ManyToOne(() => Customer, customer => customer.generatedOrders)
    customer: Customer;

    @ManyToOne(() => PaymentMethod, paymentMethod => paymentMethod.orders)
    paymentMethod: PaymentMethod;

    @ManyToMany(() => Product, product => product.orders)
    products: Product[];

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}
