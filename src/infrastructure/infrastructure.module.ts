import { Module } from '@nestjs/common';
import { PersistenceModule } from './persistence/persistence.module';
import { DatabaseModule } from './config/database/database.module';
import { IneVerifyScheduler } from './scheduler/ine.verify.scheduler';
import { EnqueueInesToVerifyUseCase } from '../application/usecases/enqueue.ines.to.verify';
import { enqueueInesToVerifyProvider } from './providers/enqueue.ines.to.verify.provider';
import { BullModule } from '@nestjs/bullmq';
import { Queue } from './enums/queue';

@Module({
    imports: [PersistenceModule, DatabaseModule, BullModule.registerQueue({ name: Queue.PROCESS_INE })],
    exports: [...enqueueInesToVerifyProvider],
    providers: [
        IneVerifyScheduler,
        ...enqueueInesToVerifyProvider,
        {
            provide: 'IEnqueueInesToVerifyUseCase',
            useClass: EnqueueInesToVerifyUseCase,
        },
    ],
})
export class InfrastructureModule {}
