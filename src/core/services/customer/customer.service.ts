import { UserInputError } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createCustomerInput } from 'src/core/domain/dtos/create-customer.input';
import { UpdateCustomerInput } from 'src/core/domain/dtos/update-customer.input';
import { Customer } from 'src/core/domain/entities/customer.entity';
import { Product } from 'src/core/domain/entities/product.entity';
import { ShoppingCart } from 'src/core/domain/entities/shopping-cart.entity';
import { ConnectionPoolClosedEvent, Repository } from 'typeorm';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private readonly _customerRepository: Repository<Customer>,
        @InjectRepository(ShoppingCart)
        private readonly _shoppingCartRepository: Repository<ShoppingCart>,
        @InjectRepository(Product)
        private readonly _productRepository: Repository<Product>,
    ) { }

    async findAll(): Promise<Customer[]> {
        return await this._customerRepository.find();
    }

    async findOne(id: number) {
        const customer = await this._customerRepository.findOne({ where: { customerId: id } })
        if (!customer) throw new UserInputError(`Customer #${id} does not exists`);
        return customer;
    }

    async create(input: createCustomerInput) {
        const cart = await this.createCartByCustomer();
        const customer = await this._customerRepository.create({ ...input, cart });    
        const newCustomerEntity = await this._customerRepository.save(customer);
        return newCustomerEntity;
    }

    // Para poder probar bien el update, necesito agregar productos a la base de datos
    // Que despues se puedan incluir en el shoping cart de un usuario. 

    async update(customerId: number, input: UpdateCustomerInput) {
        const customer = await this._customerRepository.findOne({ where: { customerId }});
        const items = await this.preloadProductsById(input.items);
        const cart = await this.updateCartByCustomer(customer, items);
        const customerToUpdate = await this._customerRepository.preload({
            customerId,
            ...UpdateCustomerInput,
            cart,
        });

        if (!customerToUpdate) return new UserInputError(`Customer #${customerId} does not exists.`);
        return await this._customerRepository.save(customerToUpdate);
    }

    async remove(customerId: number) {
        const customer = await this._customerRepository.findOne({ where: { customerId } });
        if (!customer) return new UserInputError(`Customer #${customerId} does not exists.`);
        await this.removeCartByCustomer(customer);
        return await this._customerRepository.remove(customer);
    }

    private async createCartByCustomer() {
        const newCart = await this._shoppingCartRepository.create({  });
        return await this._shoppingCartRepository.save(newCart);
    }

    private async updateCartByCustomer(customer: Customer, newItems: Product[]) {
        let { cartId, items } = await this._shoppingCartRepository.findOne({ where: { customer }});
        if (!items) items = [...newItems];
        if (items) items.push(...newItems);

        const update = await this._shoppingCartRepository.preload({
            cartId,
            customer,
            items,
        });

        if (!update) throw new UserInputError(`shopping cart #${cartId} for customer ${customer.customerId} does not exists.`);
        return await this._shoppingCartRepository.save(update);
    }

    private async removeCartByCustomer(customer: Customer) {
        const cart = await this._shoppingCartRepository.findOne({ where: { customer: { customerId: customer.customerId } } });        
        if (!cart) return null;
        return await this._shoppingCartRepository.remove(cart); 
    }

    private async preloadProductsById(productIds: number[]) {
        const items: Product[] = [];
        for (const productId of productIds) {
            const product = await this._productRepository.findOne({ where: { productId } });
            items.push(product);
        }
        return items;
    }
}
