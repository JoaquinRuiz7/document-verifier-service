import { IVerification } from '../../core/interfaces/domain/i.verification';

export class HasValidCurpVerificationImpl implements IVerification {
    verify(extractedWords: string[]): boolean {
        const curpIndex: number = extractedWords.indexOf('curp');
        if (curpIndex === -1 || curpIndex + 1 >= extractedWords.length) return false;

        const curp: string = extractedWords[curpIndex + 1].toUpperCase();

        const birthIndex: number = extractedWords.indexOf('nacimiento');
        if (birthIndex === -1 || birthIndex + 1 >= extractedWords.length) return false;

        const rawDate: string = extractedWords[birthIndex + 2];
        const curpDate: string = this.formatToCurpDate(rawDate);

        return curp.length === 18 && curp.slice(4, 10) === curpDate;
    }

    private formatToCurpDate(input: string | number): string {
        const str: string = input.toString();
        if (str.length !== 8) {
            return '';
        }

        const day: string = str.slice(0, 2);
        const month: string = str.slice(2, 4);
        const year: string = str.slice(4, 8);

        return year.slice(2) + month + day;
    }
}
