import { AnalyzeKeywordsResponse } from '../../core/interfaces/domain/i.document.verifier';

export interface IAnalyzeKeywords {
    analyze(documentKey: string): Promise<AnalyzeKeywordsResponse>;
}
