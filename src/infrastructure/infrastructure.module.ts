import { Module } from '@nestjs/common';
import { PersistenceModule } from './persistence/persistence.module';
import { DatabaseModule } from './config/database/database.module';
import { IneVerifyScheduler } from './scheduler/ine.verify.scheduler';
import { EnqueueInesToVerifyUseCase } from '../application/usecases/enqueue.ines.to.verify';
import { enqueueInesToVerifyProvider } from './providers/usecases/enqueue.ines.to.verify.provider';
import { BullModule } from '@nestjs/bullmq';
import { Queue } from './enums/queue';
import { analyzeKeywordsProvider } from './providers/services/analyze.keywords.service.provider';
import { verifyDocumentProvider } from './providers/usecases/verify.document.usecase.provider';
import { VerifyIneConsumer } from './consumers/verify.Ine.consumer';
import { S3Provider } from './storage/s3.provider';

@Module({
    imports: [PersistenceModule, DatabaseModule, BullModule.registerQueue({ name: Queue.PROCESS_INE })],
    exports: [...enqueueInesToVerifyProvider, ...analyzeKeywordsProvider, ...verifyDocumentProvider],
    providers: [
        IneVerifyScheduler,
        S3Provider,
        ...enqueueInesToVerifyProvider,
        ...analyzeKeywordsProvider,
        ...verifyDocumentProvider,
        {
            provide: 'IEnqueueInesToVerifyUseCase',
            useClass: EnqueueInesToVerifyUseCase,
        },
        VerifyIneConsumer
    ],
})
export class InfrastructureModule {}
