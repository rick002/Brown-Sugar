import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class Tax {
    @PrimaryGeneratedColumn()
    taxId: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    taxAmount: number;

    @ManyToMany(() => Product, product => product.taxes)
    products: Product[];

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}
