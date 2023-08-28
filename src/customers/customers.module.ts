import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { CustomersResolver } from './customers.resolver';
import { CartResolver } from './field/cart.resolver';
import { PaymentMethodsResolver } from './field/payment-methods.resolver';
import { GeneratedOrdersResolver } from './field/generated-orders.resolver';

@Module({
  imports: [CoreModule],
  providers: [CustomersResolver, CartResolver, PaymentMethodsResolver, GeneratedOrdersResolver]
})
export class CustomersModule {}
