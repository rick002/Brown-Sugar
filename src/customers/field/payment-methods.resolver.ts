import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/core/domain/entities/customer.entity';
import { PaymentMethod } from 'src/core/domain/entities/payment-method.entity';
import { Repository } from 'typeorm';

@Resolver(() => Customer)
export class PaymentMethodsResolver {
    constructor(
        @InjectRepository(PaymentMethod)
        private readonly paymentMethodRepository: Repository<PaymentMethod>,
    ) { }

    @ResolveField('paymentMethods', () => [PaymentMethod])
    async getPaymentMethodsByCustomer(@Parent() customer: Customer) {
        const { customerId } = customer;
        const result = await this.paymentMethodRepository
            .createQueryBuilder('payment_method')
            .innerJoin('payment_method.customer', 'customer', 'customer.customerId = :customerId', 
            { customerId })
            .getMany();
        return result;
    }
}
