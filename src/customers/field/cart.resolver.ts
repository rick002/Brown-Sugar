import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/core/domain/entities/customer.entity';
import { ShoppingCart } from 'src/core/domain/entities/shopping-cart.entity';
import { Repository } from 'typeorm';

@Resolver(() => Customer)
export class CartResolver {
    constructor(
        @InjectRepository(ShoppingCart)
        private readonly _cartRepository: Repository<ShoppingCart>
    ) {}

    @ResolveField('cart', () => ShoppingCart)
    async getCustomerCarts(@Parent() customer: Customer) {
        const { customerId } = customer;
        const result = await this._cartRepository
            .createQueryBuilder('cart')
            .innerJoin('cart.customer', 'customers', 'customers.customerId = :customerId', { customerId })
            .getOne();
        return result;
    }
}
