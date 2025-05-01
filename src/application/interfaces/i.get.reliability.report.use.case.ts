export interface IGetReliabilityReportUseCase {
    getReliabilityReport(documentId: number): Promise<{ reliabilityPercentage: number; isExpired: boolean }>;
}
