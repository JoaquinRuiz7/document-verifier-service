export interface IVerifyDocumentUseCase {
    verify(documentId: number): Promise<{
        reliabilityPercentage: number;
        isExpired: boolean;
    }>;
}
