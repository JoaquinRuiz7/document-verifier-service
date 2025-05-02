export type AnalyzeKeywordsResponse = {
    found: string[];
    missing: string[];
    percentage: number;
    lastvalidYear: number;
};

export interface IDocumentVerifier {
    analyzeKeywords(keywords: string[], words: string[]): AnalyzeKeywordsResponse;
    isExpired(words: string[]): boolean;
}
