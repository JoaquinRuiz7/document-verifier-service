export type ConfidenceScore = {
    confidence: number;
};

export interface IDocumentVerifier {
    verify(document: Buffer): Promise<ConfidenceScore>;
}
