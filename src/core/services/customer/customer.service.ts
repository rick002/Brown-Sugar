import { UserInputError } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerInput } from 'src/core/domain/dtos/create-customer.input';
import { PaymentMethodInput } from 'src/core/domain/dtos/payment-method.input';
import { UpdateCustomerInput } from 'src/core/domain/dtos/update-customer.input';
import { Customer } from 'src/core/domain/entities/customer.entity';
import { PaymentMethod } from 'src/core/domain/entities/payment-method.entity';
import { Product } from 'src/core/domain/entities/product.entity';
import { ShoppingCart } from 'src/core/domain/entities/shopping-cart.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private readonly _customerRepository: Repository<Customer>,
        @InjectRepository(ShoppingCart)
        private readonly _shoppingCartRepository: Repository<ShoppingCart>,
        @InjectRepository(Product)
        private readonly _productRepository: Repository<Product>,
        @InjectRepository(PaymentMethod)
        private readonly _paymentMethodRepository: Repository<PaymentMethod>,
        private readonly _dataSource: DataSource,
    ) { }

    async findAll(): Promise<Customer[]> {
        return await this._customerRepository.find();
    }

    async findOne(id: number) {
        const customer = await this._customerRepository.findOne({ where: { customerId: id } })
        if (!customer) throw new UserInputError(`Customer #${id} does not exists`);
        return customer;
    }

    async create(input: CreateCustomerInput) {
        const queryRunner = this._dataSource.createQueryRunner();

        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();
            const newCart = await this._shoppingCartRepository.create();
            const cart = await this._shoppingCartRepository.save(newCart);
            const customer = await this._customerRepository.create({ ...input, cart });
            const newCustomerEntity = await this._customerRepository.save(customer);
            await queryRunner.commitTransaction();
            return newCustomerEntity;
        } catch (err) {
            console.error(err);
            await queryRunner.rollbackTransaction();
            return new UserInputError(`Failed at customer creation: ${err}`);
        } finally {
            await queryRunner.release();
        }

    }

    async update(customerId: number, input: UpdateCustomerInput) {
        const queryRunner = this._dataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();

            const customer = await this._customerRepository.findOne({ where: { customerId } });
            const items = await this.preloadProductsById(input.items);
            const cart = await this.updateCartByCustomer(customer, items);
            const { paymentMethodInput } = input;
            await this.addPaymentMethodByCustomer(customer, paymentMethodInput);
            const customerToUpdate = await this._customerRepository.preload({ 
                customerId, ...input, cart,
            });

            if (!customerToUpdate) return new UserInputError(`Customer #${customerId} does not exists.`);
            const customerUpdated = await this._customerRepository.save(customerToUpdate);

            await queryRunner.commitTransaction();
            return customerUpdated;
        } catch (err) {
            console.error(err);
            await queryRunner.rollbackTransaction();
            return new UserInputError(`Failed updating the customer: ${err}`);
        } finally {
            await queryRunner.release();
        }

    }

    async remove(customerId: number) {
        const queryRunner = this._dataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();
            const customer = await this._customerRepository.findOne({ where: { customerId } });
            if (!customer) return new UserInputError(`Customer #${customerId} does not exists.`);
            await this.removeCartByCustomer(customer);
            const removedCustomer = await this._customerRepository.remove(customer);
            await queryRunner.commitTransaction();
            return removedCustomer;
        } catch (err) {
            console.error(err);
            await queryRunner.rollbackTransaction();
            return new UserInputError(`Failed removing the customer: ${err}`);
        } finally {
            await queryRunner.release();
        }

    }

    private async updateCartByCustomer(customer: Customer, newItems: Product[]) {
        const { customerId } = customer;
        let { cartId, items } = await this._shoppingCartRepository.findOne({ where: { customer: { customerId } } });
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
        const { customerId } = customer;
        const cart = await this._shoppingCartRepository.findOne({ where: { customer: { customerId } } });
        if (!cart) return null;
        return await this._shoppingCartRepository.remove(cart);
    }

    private async preloadProductsById(productIds: number[]) {
        const items = await this._productRepository
            .createQueryBuilder('product')
            .where('product.productId IN (:...productIds)', { productIds })
            .getMany();
        return items;
    }

    private async addPaymentMethodByCustomer(customer: Customer, input: PaymentMethodInput) {
        const { cardNumber, cvv, expirationDate } = input;
        const paymentMethod = await this._paymentMethodRepository.findOne({
            where: {
                cardNumber,
                cvv,
                expirationDate,
            }
        });
        if (paymentMethod) throw new UserInputError(`this payment method already exists.`);
        const newPaymentMethod = await this._paymentMethodRepository.create({ ...input, customer });
        const savedPaymentMethod = await this._paymentMethodRepository.save(newPaymentMethod);
        return savedPaymentMethod;
    }
}
