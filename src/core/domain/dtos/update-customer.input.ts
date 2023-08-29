import { Field, ID, InputType, PartialType } from "@nestjs/graphql";
import { createCustomerInput } from "./create-customer.input";

@InputType()
export class UpdateCustomerInput extends PartialType(createCustomerInput) {
    @Field(() => [ID])
    items: number[];
}