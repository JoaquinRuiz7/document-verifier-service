// src/infrastructure/providers/usecase.providers.ts

import { GetReliabilityReportUseCase } from '../../application/usecases/get.reliability.report.use.case';
import { TesseractIOpticalCharacterRecognition } from '../domain/tesseract.optical.character.recognition';
import { DocumentRepository } from '../persistence/repository/document.repository';
import { IDocumentRepository } from '../../core/interfaces/repository/i.document.repository';
import { IOpticalCharacterRecognitionProcessor } from '../../core/interfaces/domain/i.optical.character.recognition.processor';
import { IneDocumentVerifierImpl } from '../domain/ine.document.verifier.impl';
import { IDocumentVerifier } from '../../core/interfaces/domain/i.document.verifier';

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

export const verifyDocumentUseCaseProvider = {
    provide: 'GetReliabilityReportUsecase',
    useFactory: (
        documentRepo: IDocumentRepository,
        ocrProcessor: IOpticalCharacterRecognitionProcessor,
        documentVerifier: IDocumentVerifier,
    ) => new GetReliabilityReportUseCase(documentRepo, ocrProcessor, documentVerifier),
    inject: ['DocumentRepository', 'OCRProcessor', 'DocumentVerifier'],
};

export const useCaseProviders = [
    documentRepositoryProvider,
    tesseractOpticalCharacterRecognitionProvider,
    documentVerifierProvider,
    verifyDocumentUseCaseProvider,
];
