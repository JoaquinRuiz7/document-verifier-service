import { IVerification } from '../../core/interfaces/domain/i.verification';

export class IsNotExpiredVerificationImpl implements IVerification {
    verify(extractedWords: string[]): boolean {
        const { emissionYear, lastValidYear } = this.getYears(extractedWords);
        if (!emissionYear || !lastValidYear || isNaN(parseInt(emissionYear)) || isNaN(parseInt(lastValidYear))) {
            return false;
        }

        const currentYear = new Date().getFullYear();
        const vigenciaDate = parseInt(lastValidYear);

        return vigenciaDate >= currentYear;
    }

    private getYears(words: string[]): { emissionYear: string | null; lastValidYear: string | null } {
        const lowerWords = words.map((w) => w.toLowerCase());
        const emissionYearIndex = lowerWords.indexOf('emisión');
        const vigenciaIndex =
            lowerWords.indexOf('vicencia') !== -1 ? lowerWords.indexOf('vicencia') : lowerWords.indexOf('vigencia');

        if (emissionYearIndex === -1 || vigenciaIndex === -1) {
            return { emissionYear: null, lastValidYear: null };
        }

        const emissionYear: string = lowerWords[emissionYearIndex + 1];
        const lastValidYear: string = lowerWords[vigenciaIndex + 1];

        return {
            emissionYear,
            lastValidYear,
        };
    }
}
