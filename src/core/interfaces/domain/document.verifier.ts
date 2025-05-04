import { IVerification } from './i.verification';
import { ConfidenceScore, IDocumentVerifier } from './i.document.verifier';

export abstract class DocumentVerifier implements IDocumentVerifier {
    verify(document: Buffer): ConfidenceScore {
        const verifications: IVerification[] = this.getVerifications();
        let confidenceScoreSum: number = 0;
        let maxScore: number = verifications.length;
        verifications.forEach((verification: IVerification) => {
            const isVerified: boolean = verification.verify(document);
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
