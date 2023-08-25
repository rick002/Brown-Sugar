import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { Product } from "./product.entity";

@Entity()
export class Invoice {
    @PrimaryGeneratedColumn()
    invoiceId: number;

    @OneToOne(() => Order, order => order.invoice)
    order: Order;
    
    @Column()
    status: string;

    @Column()
    createdAt: Date;
    
    @Column()
    updatedAt: Date;
}
