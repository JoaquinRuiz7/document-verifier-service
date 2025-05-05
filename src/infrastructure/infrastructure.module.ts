import { Module } from '@nestjs/common';
import { PersistenceModule } from './persistence/persistence.module';
import { DatabaseModule } from './config/database/database.module';
import { IneVerifyScheduler } from './scheduler/ine.verify.scheduler';
import { enqueueInesToVerifyProvider } from './providers/usecases/enqueue.ines.to.verify.provider';
import { BullModule } from '@nestjs/bullmq';
import { Queue } from './enums/queue';
import { analyzeKeywordsProvider } from './providers/services/analyze.keywords.service.provider';
import { verifyDocumentProvider } from './providers/usecases/verify.document.usecase.provider';
import { VerifyIneConsumer } from './consumers/verify.ine.consumer';

@Module({
    imports: [PersistenceModule, DatabaseModule, BullModule.registerQueue({
        name: Queue.PROCESS_INE,
    })],
    exports: [...enqueueInesToVerifyProvider, ...analyzeKeywordsProvider, ...verifyDocumentProvider],
    providers: [
        ...enqueueInesToVerifyProvider,
        ...analyzeKeywordsProvider,
        ...verifyDocumentProvider,
        IneVerifyScheduler,
        VerifyIneConsumer,
    ],
})
export class InfrastructureModule {}
