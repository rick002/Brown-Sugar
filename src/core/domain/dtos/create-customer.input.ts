import { Field, InputType } from "@nestjs/graphql";

@InputType({ description: 'A new mutation input for the customer'})
export class createCustomerInput {
    @Field()
    name: string;

    @Field()
    lastname: string;

    @Field()
    email: string;
}