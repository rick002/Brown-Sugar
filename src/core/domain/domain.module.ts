import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Invoice } from './entities/invoice.entity';
import { Order } from './entities/order.entity';
import { PaymentMethod } from './entities/payment-method.entity';
import { Product } from './entities/product.entity';
import { ShoppingCart } from './entities/shopping-cart.entity';
import { Tax } from './entities/tax.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Customer,
            Invoice,
            Order,
            PaymentMethod,
            Product,
            ShoppingCart,
            Tax,]
        )],
    exports: [
        TypeOrmModule,
    ]
})
export class DomainModule { }
