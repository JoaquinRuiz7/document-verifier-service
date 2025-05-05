import { Injectable } from '@nestjs/common';
import { AnalyzeKeywordsResponse, IDocumentVerifier } from '../../core/interfaces/domain/i.document.verifier';

@Injectable()
export class IneDocumentVerifierImpl implements IDocumentVerifier {
    private readonly KEY_WORDS: string[] = [
        'curp',
        'instituto',
        'nacional',
        'electoral',
        'credencial',
        'para',
        'votar',
        'méxico',
        'clave',
        'de',
        'elector',
        'año',
        'registro',
        'domicilio',
        'fecha',
        'nacimiento',
        'estado',
        'municipio',
        'sección',
        'localidad',
        'vicencia',
        'emisión',
    ];

    analyzeKeywords(words: string[]): AnalyzeKeywordsResponse {
        const lowerWords: string[] = words.map((w) => w.toLowerCase());
        const keywords: string[] = this.KEY_WORDS;
        const found: string[] = keywords.filter((kw) => lowerWords.includes(kw.toLowerCase()));
        const missing: string[] = keywords.filter((kw) => !lowerWords.includes(kw.toLowerCase()));
        const isValidCurp: boolean = this.validateCurp(words);
        const maxScore: number = found.length + 1;
        const { lastValidYear } = this.getYears(words);
        const percentage: number = Math.ceil((maxScore / (isValidCurp ? keywords.length + 1 : keywords.length)) * 100);

        return { found, missing, percentage, lastValidYear: Number(lastValidYear), isExpired: this.isExpired(words) };
    }

    isExpired(words: string[]): boolean {
        const { emissionYear, lastValidYear } = this.getYears(words);
        if (!emissionYear || !lastValidYear || isNaN(parseInt(emissionYear)) || isNaN(parseInt(lastValidYear))) {
            return false;
        }

        const currentYear = new Date().getFullYear();
        const vigenciaDate = parseInt(lastValidYear);

        return vigenciaDate < currentYear;
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

    private validateCurp(words: string[]): boolean {
        const curpIndex: number = words.indexOf('curp');
        if (curpIndex === -1 || curpIndex + 1 >= words.length) return false;

        const curp: string = words[curpIndex + 1].toUpperCase();

        const birthIndex: number = words.indexOf('nacimiento');
        if (birthIndex === -1 || birthIndex + 1 >= words.length) return false;

        const rawDate: string = words[birthIndex + 3];
        console.log({ words,index:words.indexOf('nacimiento') });
        const curpDate: string = this.formatToCurpDate(rawDate);

        return curp.length === 18 && curp.slice(4, 10) === curpDate;
    }

    private formatToCurpDate(input: string | number): string {
        const str = input.toString();
        console.log({input});
        if (str.length !== 8) {
            throw new Error('Input must be 8 digits in DDMMYYYY format');
        }

        const day = str.slice(0, 2);
        const month = str.slice(2, 4);
        const year = str.slice(4, 8);

        return year.slice(2) + month + day;
    }
}
