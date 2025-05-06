import { DocumentData, IDocumentDataExtractor } from './i.document.data.extractor';
import { IOpticalCharacterRecognitionProcessor } from './i.optical.character.recognition.processor';

export abstract class DocumentDataExtractor implements IDocumentDataExtractor {
    protected constructor(protected readonly ocr: IOpticalCharacterRecognitionProcessor) {}

    async extractData(document: Buffer): Promise<DocumentData> {
        const extractedWords: string[] = await this.ocr.readImageAndExtractText(document);
        return {
            expirationDate: this.extractExpirationDate(extractedWords),
            holdersName: this.extractHoldersName(extractedWords),
            isExpired: this.isExpired(extractedWords),
        };
    }

    abstract extractExpirationDate(extractedWords: string[]): Date;
    abstract extractHoldersName(extractedWords: string[]): string;
    abstract isExpired(extractedWords: string[]): boolean;
}
