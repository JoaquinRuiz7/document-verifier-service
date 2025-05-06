import { IVerification } from '../../../core/interfaces/domain/i.verification';

export class HasValidCurpVerificationImpl implements IVerification {
    verify(extractedWords: string[]): boolean {
        const curpIndex: number = extractedWords.indexOf('curp');
        if (curpIndex === -1 || curpIndex + 1 >= extractedWords.length) return false;

        const curp: string = extractedWords[curpIndex + 1].toUpperCase();

        const datePattern = /\b(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[0-2])\d{4}\b/;
        const rawDate: string | undefined = extractedWords.find((word) => datePattern.test(word));
        const curpDate: string = this.formatToCurpDate(rawDate);

        return curp.length === 18 && curp.slice(4, 10) === curpDate;
    }

    private formatToCurpDate(input: string | undefined): string {
        if (!input) return '';

        const day: string = input.slice(0, 2);
        const month: string = input.slice(2, 4);
        const year: string = input.slice(4, 8);

        return year.slice(2) + month + day; // Format: YYMMDD
    }
}
