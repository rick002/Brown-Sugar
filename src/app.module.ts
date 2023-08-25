import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { OrdersResolver } from './orders/orders.resolver';
import { CustomersResolver } from './customers/customers.resolver';
import { ProductsResolver } from './products/products.resolver';
import { ShoppingCartResolver } from './shopping-cart/shopping-cart.resolver';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CoreModule,
    CustomersModule,
    OrdersModule,
    ProductsModule,
    ShoppingCartModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass123',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, OrdersResolver, CustomersResolver, ProductsResolver, ShoppingCartResolver],
})
export class AppModule { }
