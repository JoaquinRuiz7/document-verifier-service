export interface IVerifyDocumentUseCase {
    verify(documentId: number): Promise<{
        confidence: number;
    }>;
}
