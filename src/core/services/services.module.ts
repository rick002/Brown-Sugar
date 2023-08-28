import { Module } from '@nestjs/common';
import { DomainModule } from '../domain/domain.module';
import { CustomerService } from './customer/customer.service';

@Module({
  imports: [DomainModule],
  providers: [CustomerService],
  exports: [CustomerService]
})
export class ServicesModule {}
