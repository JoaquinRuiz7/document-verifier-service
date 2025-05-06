import { DocumentDataExtractor } from '../../../core/interfaces/domain/document.data.extractor';
import { IneUtils } from '../ine.utils';

export class IneDocumentDataExtractorImpl extends DocumentDataExtractor {
    extractExpirationDate(extractedWords: string[]): Date | null {
        const { lastValidYear } = IneUtils.getYears(extractedWords);

        if (!lastValidYear) {
            return null;
        }

        const expirationDate = new Date(Number(lastValidYear), 0, 1);

        if (isNaN(expirationDate.getTime())) {
            return null;
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
