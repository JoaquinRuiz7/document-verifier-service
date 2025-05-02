// src/infrastructure/providers/usecase.providers.ts

import { S3Storage } from '../../storage/s3.storage';
import { TesseractIOpticalCharacterRecognition } from '../../domain/tesseract.optical.character.recognition';
import { IneDocumentVerifierImpl } from '../../domain/ine.document.verifier.impl';
import { IStorage } from '../../../core/interfaces/storage/i.storage';
import { IOpticalCharacterRecognitionProcessor } from '../../../core/interfaces/domain/i.optical.character.recognition.processor';
import { IDocumentVerifier } from '../../../core/interfaces/domain/i.document.verifier';
import { AnalyzeKeywordsService } from '../../../application/services/analyze.keywords.service';

export const storageProvider = {
    provide: 'IStorage',
    useClass: S3Storage,
};

export const ocrProvider = {
    provide: 'IOpticalCharacterRecognitionProcessor',
    useClass: TesseractIOpticalCharacterRecognition,
};

export const documentVerifier = {
    provide: 'IDocumentVerifier',
    useClass: IneDocumentVerifierImpl,
};

export const analyzeKeywordsServiceProvider = {
    provide: 'AnalyzeKeywordsService',
    useFactory: (storage: IStorage, ocr: IOpticalCharacterRecognitionProcessor, verifier: IDocumentVerifier) =>
        new AnalyzeKeywordsService(storage, ocr, verifier),
    inject: ['IStorage', 'IOpticalCharacterRecognitionProcessor', 'IDocumentVerifier'],
};

export const analyzeKeywordsProvider = [storageProvider, ocrProvider, documentVerifier, analyzeKeywordsServiceProvider];
