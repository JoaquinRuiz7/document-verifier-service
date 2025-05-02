import { Module } from '@nestjs/common';
import { VerifyIneConsumer } from './verify.Ine.consumer';
import { verifyDocumentProvider } from '../providers/verify.document.usecase.provider';
import { DatabaseModule } from '../config/database/database.module';
import { S3Provider } from '../storage/s3.provider';

@Module({
    imports: [DatabaseModule],
    providers: [VerifyIneConsumer, ...verifyDocumentProvider, S3Provider],
    exports: [...verifyDocumentProvider],
})
export class ConsumersModule {}
