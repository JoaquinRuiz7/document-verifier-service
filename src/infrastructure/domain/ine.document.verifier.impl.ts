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
        const lowerWords = words.map((w) => w.toLowerCase());
        const keywords = this.KEY_WORDS;
        const found = keywords.filter((kw) => lowerWords.includes(kw.toLowerCase()));
        const missing = keywords.filter((kw) => !lowerWords.includes(kw.toLowerCase()));
        const percentage = Math.ceil((found.length / keywords.length) * 100);
        const { lastValidYear } = this.getYears(words);
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
}
