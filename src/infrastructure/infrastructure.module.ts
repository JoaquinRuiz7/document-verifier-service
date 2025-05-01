import { Module } from '@nestjs/common';
import { PersistenceModule } from './persistence/persistence.module';
import { DatabaseModule } from './config/database/database.module';
import { GetReliabilityReportUseCase } from '../application/usecases/get.reliability.report.use.case';

@Module({
    imports: [PersistenceModule, DatabaseModule],
})
export class InfrastructureModule {}
