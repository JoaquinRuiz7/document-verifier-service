export type AnalyzeResult = {
    isExpired: boolean;
    validUntil: number;
    hasFaceImage?: boolean;
};

export interface IDocumentAnalyzer {
    analyze(document: Buffer): AnalyzeResult;
}
