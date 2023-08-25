import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./customer.entity";
import { Order } from "./order.entity";

@Entity()
export class PaymentMethod {
    @PrimaryGeneratedColumn()
    paymentMethodId: number;

    @Column()
    cardNumber: string;

    @Column()
    expirationDate: string;

    @Column()
    cvv: string;
    
    @ManyToOne(() => Customer, customer => customer.paymentMethods)
    customer: Customer;

    @OneToMany(() => Order, order => order.paymentMethod)
    orders: Order[];

    @Column()
    createdAt: Date;
    
    @Column()
    updatedAt: Date;
}
