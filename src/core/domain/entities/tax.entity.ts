import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity()
@ObjectType({ description: 'A tax model.' })
export class Tax {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    taxId: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    description: string;

    @Field()
    @Column()
    taxAmount: number;

    @Field(() => [Product])
    @ManyToMany(() => Product, product => product.taxes)
    products: Product[];

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}
