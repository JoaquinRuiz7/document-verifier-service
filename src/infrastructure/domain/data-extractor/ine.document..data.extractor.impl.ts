import { DocumentDataExtractor } from '../../../core/interfaces/domain/document.data.extractor';
import { IneUtils } from '../ine.utils';

export class IneDocumentDataExtractorImpl extends DocumentDataExtractor {
    extractExpirationDate(extractedWords: string[]): Date {
        const { lastValidYear } = IneUtils.getYears(extractedWords);
        if (!lastValidYear) {
            throw new Error('Invalid date');
        }
        return new Date(lastValidYear as string);
    }

    extractHoldersName(extractedWords: string[]): string {
        throw new Error('Method not implemented.');
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
