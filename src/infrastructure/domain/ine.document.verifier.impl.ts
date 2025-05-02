import { Injectable } from '@nestjs/common';
import { AnalyzeKeywordsResponse, IDocumentVerifier } from '../../core/interfaces/domain/i.document.verifier';

@Injectable()
export class IneDocumentVerifierImpl implements IDocumentVerifier {
    analyzeKeywords(keywords: string[], words: string[]): AnalyzeKeywordsResponse {
        const lowerWords = words.map((w) => w.toLowerCase());
        const found = keywords.filter((kw) => lowerWords.includes(kw.toLowerCase()));
        const missing = keywords.filter((kw) => !lowerWords.includes(kw.toLowerCase()));
        const percentage = Math.ceil((found.length / keywords.length) * 100);
        return { found, missing, percentage };
    }

    isExpired(words: string[]): boolean {
        const lowerWords = words.map((w) => w.toLowerCase());
        const emissionYearIndex = lowerWords.indexOf('emisión');
        const vigenciaIndex =
            lowerWords.indexOf('vicencia') !== -1 ? lowerWords.indexOf('vicencia') : lowerWords.indexOf('vigencia');

        if (emissionYearIndex === -1 || vigenciaIndex === -1) {
            return false;
        }

        const emissionYear = lowerWords[emissionYearIndex + 1];
        const vigenciaYear = lowerWords[vigenciaIndex + 1];

        if (!emissionYear || !vigenciaYear || isNaN(parseInt(emissionYear)) || isNaN(parseInt(vigenciaYear))) {
            return false;
        }

        const currentYear = new Date().getFullYear();
        const vigenciaDate = parseInt(vigenciaYear);

        return vigenciaDate < currentYear;
    }
}
