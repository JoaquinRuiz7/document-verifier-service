import { S3Storage } from '../../storage/s3.storage';
import { IStorage } from '../../../core/interfaces/storage/i.storage';
import { GetDocumentFromStorageUseCase } from '../../../application/usecases/get.document.from.storage.use.case';
import { IAnalyzeKeywords } from '../../../application/interfaces/IAnalyzeKeywords';
import { IReliabilityReportRepository } from '../../../core/interfaces/repository/i.reliability.report.repository';
import { IDocumentRepository } from '../../../core/interfaces/repository/i.document.repository';
import { GetReliabilityReportUseCase } from '../../../application/usecases/get.reliability.report.use.case';

export const storageProvider = {
    provide: 'IStorage',
    useClass: S3Storage,
};

export const getObjectFromStorageProvider = {
    provide: 'GetDocumentFromStorageUseCase',
    useFactory: (storage: IStorage) => new GetDocumentFromStorageUseCase(storage),
    inject: ['IStorage'],
};

export const verifyDocumentUseCaseProvider = {
    provide: 'GetReliabilityReportUsecase',
    useFactory: (
        analyzeKeywordsProvider: IAnalyzeKeywords,
        reliabilityReportRepository: IReliabilityReportRepository,
        documentRepository: IDocumentRepository,
    ) => new GetReliabilityReportUseCase(analyzeKeywordsProvider, reliabilityReportRepository, documentRepository),
    inject: ['IDocumentRepository', 'IReliabilityReportRepository', 'IDocumentRepository'],
};

export const getObjectsUseCaseProvider = [storageProvider];
