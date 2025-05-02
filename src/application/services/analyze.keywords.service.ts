import { IStorage } from '../../core/interfaces/storage/i.storage';
import { IOpticalCharacterRecognitionProcessor } from '../../core/interfaces/domain/i.optical.character.recognition.processor';
import { AnalyzeKeywordsResponse, IDocumentVerifier } from '../../core/interfaces/domain/i.document.verifier';
import { IAnalyzeKeywords } from '../interfaces/IAnalyzeKeywords';

export class AnalyzeKeywordsService implements IAnalyzeKeywords {
    constructor(
        private readonly storage: IStorage,
        private readonly ocr: IOpticalCharacterRecognitionProcessor,
        private readonly verifier: IDocumentVerifier,
    ) {}

    public async analyze(documentKey: string): Promise<AnalyzeKeywordsResponse> {
        const buffer = await this.storage.getObject(documentKey);
        const words = await this.ocr.readImageAndExtractText(buffer);
        if (words.length === 0)
            return {
                isExpired: false,
                lastValidYear: 0,
                percentage: 0,
                found: [],
                missing: [],
            };

        return this.verifier.analyzeKeywords(words);
    }
}
