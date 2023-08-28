import { ParseIntPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { createCustomerInput } from 'src/core/domain/dtos/create-customer.input';
import { UpdateCustomerInput } from 'src/core/domain/dtos/update-customer.input';
import { Customer } from 'src/core/domain/entities/customer.entity';
import { CustomerService } from 'src/core/services/customer/customer.service';

@Resolver()
export class CustomersResolver {
    constructor(
        private _customerService: CustomerService,
    ) {}
    @Query(() => [Customer], { name: 'customers' })
    async findAll() {
        return await this._customerService.findAll();
    }

    @Query(() => Customer, { name: 'customer'})
    async findOne(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
        return await this._customerService.findOne(id);
    }

    @Mutation(() => Customer, { name: 'createCustomer' })
    async create(@Args('createCustomerInput') createCustomerInput: createCustomerInput) {
        return await this._customerService.create(createCustomerInput);
    }

    @Mutation(() => Customer, { name: 'updateCustomer'})
    async update(
        @Args('id', { type: () => ID }, ParseIntPipe) id: number, 
        @Args('updateCustomerInput') updateCustomerInput: UpdateCustomerInput) {
        return await this._customerService.update(id, updateCustomerInput);
    }

    @Mutation(() => Customer, { name: 'removeCustomer' })
    async remove(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
        return await this._customerService.remove(id);
    }    
}
