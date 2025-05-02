// src/infrastructure/providers/usecase.providers.ts

import { S3Storage } from '../../storage/s3.storage';
import { TesseractIOpticalCharacterRecognition } from '../../domain/tesseract.optical.character.recognition';
import { IneDocumentVerifierImpl } from '../../domain/ine.document.verifier.impl';
import { S3Provider } from '../../storage/s3.provider';

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

export const analyzeKeywordsProvider = [S3Provider, storageProvider, ocrProvider, documentVerifier];
