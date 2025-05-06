// src/infrastructure/providers/usecase.providers.ts

import { VerifyIneDocumentUseCaseImpl } from '../../../application/usecases/verify.ine.document.use.case.impl';
import { ReliabilityReportRepository } from '../../persistence/repository/reliability.report.repository';
import { IReliabilityReportRepository } from '../../../core/interfaces/repository/i.reliability.report.repository';
import { DocumentRepository } from '../../persistence/repository/document.repository';
import { IDocumentRepository } from '../../../core/interfaces/repository/i.document.repository';
import { IStorage } from '../../../core/interfaces/storage/i.storage';
import { IDocumentVerifier } from '../../../core/interfaces/domain/i.document.verifier';
import { IneDocumentVerifier } from '../../domain/ine.document.verifier';
import { S3Storage } from '../../storage/s3.storage';
import { IOpticalCharacterRecognitionProcessor } from '../../../core/interfaces/domain/i.optical.character.recognition.processor';
import { TesseractIOpticalCharacterRecognitionImpl } from '../../domain/tesseract.optical.character.recognition.impl';

export const iOpticalCharacterRecognitionProcessor = {
    provide: 'IOpticalCharacterRecognitionProcessor',
    useClass: TesseractIOpticalCharacterRecognitionImpl,
};
export const documentVerifierProvider = {
    provide: 'IDocumentVerifier',
    useFactory: (ocr: IOpticalCharacterRecognitionProcessor) => {
        return new IneDocumentVerifier(ocr);
    },
    inject: ['IOpticalCharacterRecognitionProcessor'],
};

export const iStorageProvider = {
    provide: 'IStorage',
    useClass: S3Storage,
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
    provide: 'IVerifyDocumentUseCase',
    useFactory: (
        storage: IStorage,
        documentVerifier: IDocumentVerifier,
        reliabilityReportRepository: IReliabilityReportRepository,
        documentRepository: IDocumentRepository,
    ) => new VerifyIneDocumentUseCaseImpl(storage, documentVerifier, reliabilityReportRepository, documentRepository),
    inject: ['IStorage', 'IDocumentVerifier', 'IReliabilityReportRepository', 'IDocumentRepository'],
};

export const verifyDocumentProvider = [
    verifyDocumentUseCaseProvider,
    documentVerifierProvider,
    iStorageProvider,
    reliabilityReportRepositoryProvider,
    documentRepositoryProvider,
    iOpticalCharacterRecognitionProcessor,
];
