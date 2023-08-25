import { Module } from '@nestjs/common';
import { ShoppingCartResolver } from './shopping-cart.resolver';

@Module({
  providers: [ShoppingCartResolver]
})
export class ShoppingCartModule {}
