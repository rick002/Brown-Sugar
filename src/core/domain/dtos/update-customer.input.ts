import { Field, ID, InputType, PartialType } from "@nestjs/graphql";
import { Product } from "../entities/product.entity";
import { createCustomerInput } from "./create-customer.input";

@InputType()
export class UpdateCustomerInput extends PartialType(createCustomerInput) {
    @Field(() => [ID])
    items: number[];
}