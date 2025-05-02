// src/infrastructure/providers/usecase.providers.ts

import { GetReliabilityReportUseCase } from '../../../application/usecases/get.reliability.report.use.case';
import { ReliabilityReportRepository } from '../../persistence/repository/reliability.report.repository';
import { IReliabilityReportRepository } from '../../../core/interfaces/repository/i.reliability.report.repository';
import { DocumentRepository } from '../../persistence/repository/document.repository';
import { IDocumentRepository } from '../../../core/interfaces/repository/i.document.repository';
import { IAnalyzeKeywords } from '../../../application/interfaces/IAnalyzeKeywords';
import { AnalyzeKeywordsService } from '../../../application/services/analyze.keywords.service';

export const analyzeKeyWordsServiceProvider = {
    provide: 'IAnalyzeKeywords',
    useClass: AnalyzeKeywordsService,
};
export const reliabilityReportRepositoryProvider = {
    provide: 'IReliabilityReportRepository',
    useClass: ReliabilityReportRepository,
};

export const documentRepositoryProvider = {
    provide: 'IDocumentRepository',
    useClass: DocumentRepository,
};

export const verifyDocumentUseCaseProvider = {
    provide: 'GetReliabilityReportUsecase',
    useFactory: (
        analyzeKeywordsProvider: IAnalyzeKeywords,
        reliabilityReportRepository: IReliabilityReportRepository,
        documentRepository: IDocumentRepository,
    ) => new GetReliabilityReportUseCase(analyzeKeywordsProvider, reliabilityReportRepository, documentRepository),
    inject: ['IAnalyzeKeywords', 'IReliabilityReportRepository', 'IDocumentRepository'],
};

export const verifyDocumentProvider = [
    analyzeKeyWordsServiceProvider,
    reliabilityReportRepositoryProvider,
    documentRepositoryProvider,
    verifyDocumentUseCaseProvider,
];
