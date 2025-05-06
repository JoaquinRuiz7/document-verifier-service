import { Module } from '@nestjs/common';
import { PersistenceModule } from './persistence/persistence.module';
import { DatabaseModule } from './config/database/database.module';
import { IneVerifyScheduler } from './scheduler/ine.verify.scheduler';
import { enqueueInesToVerifyProvider } from './providers/usecases/enqueue.ines.to.verify.provider';
import { BullModule } from '@nestjs/bullmq';
import { Queue } from './enums/queue';
import { verifyDocumentProvider } from './providers/usecases/verify.document.usecase.provider';
import { VerifyIneConsumer } from './consumers/verify.ine.consumer';
import { DoocumentsController } from './doocuments/doocuments.controller';
import { S3Provider } from './storage/s3.provider';

@Module({
    imports: [
        PersistenceModule,
        DatabaseModule,
        BullModule.registerQueue({
            name: Queue.PROCESS_INE,
        }),
    ],
    exports: [...enqueueInesToVerifyProvider, ...verifyDocumentProvider, S3Provider],
    providers: [
        ...enqueueInesToVerifyProvider,
        ...verifyDocumentProvider,
        IneVerifyScheduler,
        VerifyIneConsumer,
        S3Provider,
    ],
    controllers: [DoocumentsController],
})
export class InfrastructureModule {}
