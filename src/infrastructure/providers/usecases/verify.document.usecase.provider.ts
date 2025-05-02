// src/infrastructure/providers/usecase.providers.ts

import { GetReliabilityReportUseCase } from '../../../application/usecases/get.reliability.report.use.case';
import { ReliabilityReportRepository } from '../../persistence/repository/reliability.report.repository';
import { IReliabilityReportRepository } from '../../../core/interfaces/repository/i.reliability.report.repository';
import { DocumentRepository } from '../../persistence/repository/document.repository';
import { IDocumentRepository } from '../../../core/interfaces/repository/i.document.repository';
import { IAnalyzeKeywords } from '../../../application/interfaces/i.analyze.keywords';
import { AnalyzeKeywordsService } from '../../../application/services/analyze.keywords.service';
import { IStorage } from '../../../core/interfaces/storage/i.storage';
import { IOpticalCharacterRecognitionProcessor } from '../../../core/interfaces/domain/i.optical.character.recognition.processor';
import { IDocumentVerifier } from '../../../core/interfaces/domain/i.document.verifier';

export const analyzeKeywordsServiceProvider = {
    provide: 'IAnalyzeKeywords',
    useFactory: (storage: IStorage, ocr: IOpticalCharacterRecognitionProcessor, verifier: IDocumentVerifier) =>
        new AnalyzeKeywordsService(storage, ocr, verifier),
    inject: ['IStorage', 'IOpticalCharacterRecognitionProcessor', 'IDocumentVerifier'],
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
    provide: 'IGetReliabilityReportUseCase',
    useFactory: (
        analyzeKeywordsProvider: IAnalyzeKeywords,
        reliabilityReportRepository: IReliabilityReportRepository,
        documentRepository: IDocumentRepository,
    ) => new GetReliabilityReportUseCase(analyzeKeywordsProvider, reliabilityReportRepository, documentRepository),
    inject: ['IAnalyzeKeywords', 'IReliabilityReportRepository', 'IDocumentRepository'],
};

export const verifyDocumentProvider = [
    analyzeKeywordsServiceProvider,
    reliabilityReportRepositoryProvider,
    documentRepositoryProvider,
    verifyDocumentUseCaseProvider,
];
