import { Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { Customer } from 'src/core/domain/entities/customer.entity';

@Resolver()
export class CustomersResolver {
    @Query(() => [Customer], { name: 'customers' })
    async findAll(): Promise<Customer[]> {
        return [];
    }
}
