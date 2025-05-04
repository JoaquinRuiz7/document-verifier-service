import { IVerification } from './i.verification';
import { ConfidenceScore, IDocumentVerifier } from './i.document.verifier';
import { IOpticalCharacterRecognitionProcessor } from './i.optical.character.recognition.processor';

export abstract class DocumentVerifier implements IDocumentVerifier {
    protected constructor(protected readonly ocr: IOpticalCharacterRecognitionProcessor) {}

    async verify(document: Buffer): Promise<ConfidenceScore> {
        const verifications: IVerification[] = this.getVerifications();
        let confidenceScoreSum: number = 0;
        let maxScore: number = verifications.length;
        const extractedWords: string[] = await this.ocr.readImageAndExtractText(document);
        verifications.forEach((verification: IVerification) => {
            const isVerified: boolean = verification.verify(extractedWords);
            if (isVerified) {
                confidenceScoreSum++;
            }
        });

        return {
            confidence: (confidenceScoreSum * 100) / maxScore,
        };
    }

    protected abstract getVerifications(): IVerification[];
}
