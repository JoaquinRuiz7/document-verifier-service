import { Module } from '@nestjs/common';
import { PersistenceModule } from './persistence/persistence.module';
import { DatabaseModule } from './config/database/database.module';
import { GetReliabilityReportUseCase } from '../application/usecases/get.reliability.report.use.case';
import { BullModule } from '@nestjs/bullmq';
import { Queue } from './enums/queue';

@Module({
    imports: [BullModule.registerQueue({ name: Queue.PROCESS_INE }), PersistenceModule, DatabaseModule],
})
export class InfrastructureModule {}
