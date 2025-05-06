export interface IProcessDocumentUseCase {
    process(documentId: number): Promise<{
        confidence: number;
    }>;
}
