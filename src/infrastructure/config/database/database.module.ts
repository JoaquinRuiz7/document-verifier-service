import { Module } from '@nestjs/common';
import { databaseProviders, ineReliabilityReportProvider, legalDocumentsProvider } from './dabatase.config';

@Module({
    providers: [...databaseProviders, ...legalDocumentsProvider, ...ineReliabilityReportProvider],
    exports: [...databaseProviders, ...legalDocumentsProvider, ...ineReliabilityReportProvider],
})
export class DatabaseModule {}
