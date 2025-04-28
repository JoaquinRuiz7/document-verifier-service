import { Module } from '@nestjs/common';
import { databaseProviders, legalDocumentsProvider } from './dabatase.config';

@Module({
    providers: [...databaseProviders, ...legalDocumentsProvider],
    exports: [...databaseProviders, ...legalDocumentsProvider],
})
export class DatabaseModule {}
