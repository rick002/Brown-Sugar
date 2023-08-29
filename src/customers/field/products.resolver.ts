import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/core/domain/entities/product.entity';
import { ShoppingCart } from 'src/core/domain/entities/shopping-cart.entity';
import { Repository } from 'typeorm';

@Resolver(() => ShoppingCart)
export class ProductsResolver {
    constructor(
        @InjectRepository(Product)
        private readonly _productsRepository: Repository<Product>,
    ) {}

    @ResolveField('items', () => [Product])
    async getShoppingCartItems(@Parent() cart: ShoppingCart) {
        const result = await this._productsRepository
            .createQueryBuilder('product')
            .innerJoin('product.carts', 'shopping-cart', 'shopping-cart.cartId = :cartId',
            { cartId: cart.cartId})
            .getMany();
        return result;
    }
}
