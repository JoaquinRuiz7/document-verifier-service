import { IVerification } from 'src/core/interfaces/domain/i.verification';
import { DocumentVerifier } from '../../core/interfaces/domain/document.verifier';
import { IneKeywordsVerification } from './verifications/ine.keywords.verification';
import { HasValidCurpVerificationImpl } from './verifications/has.valid.curp.verification.impl';
import { IsNotExpiredVerificationImpl } from './verifications/is.not.expired.verification.impl';

export class IneDocumentVerifier extends DocumentVerifier {
    protected getVerifications(): IVerification[] {
        return [new IneKeywordsVerification(), new HasValidCurpVerificationImpl(), new IsNotExpiredVerificationImpl()];
    }
}
