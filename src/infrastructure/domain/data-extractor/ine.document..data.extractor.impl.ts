import { DocumentDataExtractor } from '../../../core/interfaces/domain/document.data.extractor';
import { IneUtils } from '../ine.utils';

export class IneDocumentDataExtractorImpl extends DocumentDataExtractor {
    extractExpirationDate(extractedWords: string[]): Date {
        const { lastValidYear } = IneUtils.getYears(extractedWords);

        if (!lastValidYear) {
            throw new Error('Invalid date');
        }

        const expirationDate = new Date(Number(lastValidYear), 0, 1);

        if (isNaN(expirationDate.getTime())) {
            throw new Error('Invalid date');
        }

        return expirationDate;
    }


    isExpired(extractedWords: string[]): boolean {
        const { emissionYear, lastValidYear } = IneUtils.getYears(extractedWords);
        if (!emissionYear || !lastValidYear || isNaN(parseInt(emissionYear)) || isNaN(parseInt(lastValidYear))) {
            return false;
        }

        const currentYear = new Date().getFullYear();
        const vigenciaDate = parseInt(lastValidYear);

        return vigenciaDate < currentYear;
    }
}
