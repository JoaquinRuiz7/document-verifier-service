export type AnalyzeKeywordsResponse = {
    found: string[];
    missing: string[];
    percentage: number;
    lastValidYear: number;
    isExpired: boolean;
};

export interface IDocumentVerifier {
    analyzeKeywords(words: string[]): AnalyzeKeywordsResponse;
    isExpired(words: string[]): boolean;
}
