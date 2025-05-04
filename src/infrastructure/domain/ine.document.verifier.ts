import { IVerification } from 'src/core/interfaces/domain/i.verification';
import { DocumentVerifier } from '../../core/interfaces/domain/document.verifier';
import { IneKeywordsVerification } from './ine.keywords.verification';

export class IneDocumentVerifier extends DocumentVerifier {
    protected getVerifications(): IVerification[] {
        return [new IneKeywordsVerification()];
    }
}
