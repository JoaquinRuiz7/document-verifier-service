import { AnalyzeKeywordsResponse, IDocumentVerifier } from '../../core/interfaces/domain/i.document.verifier';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IneDocumentVerifierImpl implements IDocumentVerifier {
    analyzeKeywords(keywords: string[], words: string[]): AnalyzeKeywordsResponse {
        const found: string[] = keywords.filter((kw) => words.includes(kw.toLowerCase()));
        const missing: string[] = keywords.filter((kw) => !words.includes(kw.toLowerCase()));
        const percentage: number = Math.ceil((found.length / keywords.length) * 100);
        return { found, missing, percentage };
    }

    isExpired(words: string[]): boolean {
        const emissionYearIndex: number = words.indexOf('emisión');
        const vigenciaIndex: number =
            words.indexOf('vicencia') !== -1 ? words.indexOf('vicencia') : words.indexOf('vigencia');

        if (emissionYearIndex === -1 || vigenciaIndex === -1) {
            return false;
        }

        const emissionYear = words[emissionYearIndex + 1];
        const vigenciaYear = words[vigenciaIndex + 1];

        if (!emissionYear || !vigenciaYear || isNaN(parseInt(emissionYear)) || isNaN(parseInt(vigenciaYear))) {
            return false;
        }

        const currentYear: number = new Date().getFullYear();
        const vigenciaDate: number = parseInt(vigenciaYear);

        return vigenciaDate > currentYear;
    }
}
