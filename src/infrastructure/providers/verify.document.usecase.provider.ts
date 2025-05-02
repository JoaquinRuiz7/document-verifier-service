// src/infrastructure/providers/usecase.providers.ts

import { GetReliabilityReportUseCase } from '../../application/usecases/get.reliability.report.use.case';
import { TesseractIOpticalCharacterRecognition } from '../domain/tesseract.optical.character.recognition';
import { DocumentRepository } from '../persistence/repository/document.repository';
import { IDocumentRepository } from '../../core/interfaces/repository/i.document.repository';
import { IOpticalCharacterRecognitionProcessor } from '../../core/interfaces/domain/i.optical.character.recognition.processor';
import { IneDocumentVerifierImpl } from '../domain/ine.document.verifier.impl';
import { IDocumentVerifier } from '../../core/interfaces/domain/i.document.verifier';
import { ReliabilityReportRepository } from '../persistence/repository/reliability.report.repository';
import { IReliabilityReportRepository } from '../../core/interfaces/repository/i.reliability.report.repository';
import { S3Storage } from '../storage/s3.storage';
import { IStorage } from '../../core/interfaces/storage/i.storage';

export const documentRepositoryProvider = {
    provide: 'DocumentRepository',
    useClass: DocumentRepository,
};

export const tesseractOpticalCharacterRecognitionProvider = {
    provide: 'OCRProcessor',
    useClass: TesseractIOpticalCharacterRecognition,
};

export const documentVerifierProvider = {
    provide: 'DocumentVerifier',
    useClass: IneDocumentVerifierImpl,
};

export const reliabilityReportRepositoryProvider = {
    provide: 'IReliabilityReportRepository',
    useClass: ReliabilityReportRepository,
};

export const storageProvider = {
    provide: 'IStorage',
    useClass: S3Storage,
};

export const verifyDocumentUseCaseProvider = {
    provide: 'GetReliabilityReportUsecase',
    useFactory: (
        documentRepo: IDocumentRepository,
        ocrProcessor: IOpticalCharacterRecognitionProcessor,
        documentVerifier: IDocumentVerifier,
        reliabilityReportRepository: IReliabilityReportRepository,
        storage: IStorage,
    ) =>
        new GetReliabilityReportUseCase(
            documentRepo,
            ocrProcessor,
            documentVerifier,
            reliabilityReportRepository,
            storage,
        ),
    inject: ['DocumentRepository', 'OCRProcessor', 'DocumentVerifier', 'IReliabilityReportRepository', 'IStorage'],
};

export const useCaseProviders = [
    documentRepositoryProvider,
    tesseractOpticalCharacterRecognitionProvider,
    documentVerifierProvider,
    verifyDocumentUseCaseProvider,
    reliabilityReportRepositoryProvider,
    storageProvider,
];
