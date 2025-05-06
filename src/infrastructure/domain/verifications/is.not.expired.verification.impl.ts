import { IVerification } from '../../../core/interfaces/domain/i.verification';
import { IneUtils } from '../ine.utils';

export class IsNotExpiredVerificationImpl implements IVerification {
    verify(extractedWords: string[]): boolean {
        const { emissionYear, lastValidYear } = IneUtils.getYears(extractedWords);
        if (!emissionYear || !lastValidYear || isNaN(parseInt(emissionYear)) || isNaN(parseInt(lastValidYear))) {
            return false;
        }

        const currentYear: number = new Date().getFullYear();
        const validUntilYear: number = parseInt(lastValidYear);
        return validUntilYear >= currentYear;
    }
}
