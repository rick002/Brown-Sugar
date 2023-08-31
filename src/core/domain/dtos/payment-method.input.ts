import { Field, InputType } from "@nestjs/graphql";

@InputType({ description: 'A Payment input model for mutations' })
export class PaymentMethodInput {
    @Field()
    cardNumber: string;

    @Field()
    expirationDate: string;

    @Field()
    cvv: string;
}