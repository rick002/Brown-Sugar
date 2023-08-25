import { Module } from '@nestjs/common';
import { DomainModule } from './domain/domain.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [DomainModule, ServicesModule],
  exports: [DomainModule, ServicesModule],
})
export class CoreModule {}
