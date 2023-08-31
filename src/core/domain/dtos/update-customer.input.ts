import { Field, ID, InputType, PartialType } from "@nestjs/graphql";
import { CreateCustomerInput } from "./create-customer.input";
import { PaymentMethodInput } from "./payment-method.input";

@InputType()
export class UpdateCustomerInput extends PartialType(CreateCustomerInput) {
    @Field(() => [ID])
    items: number[];

    @Field(() => PaymentMethodInput)
    paymentMethodInput: PaymentMethodInput;
    
}