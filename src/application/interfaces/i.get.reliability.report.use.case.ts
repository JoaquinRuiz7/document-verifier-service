export interface IGetReliabilityReportUseCase {
    getReliabilityReport(
        documentKey: string,
        documentId: number,
    ): Promise<{
        reliabilityPercentage: number;
        isExpired: boolean;
    }>;
}
