import { IGetReliabilityReportUseCase } from '../interfaces/i.get.reliability.report.use.case';
import { AnalyzeKeywordsResponse } from '../../core/interfaces/domain/i.document.verifier';
import { IReliabilityReportRepository } from '../../core/interfaces/repository/i.reliability.report.repository';
import { IneReliabilityReport } from '../../core/entities/ine.reliability.report';
import { LegalDocument } from '../../core/entities/legal.document';
import { IAnalyzeKeywords } from '../interfaces/IAnalyzeKeywords';
import { IDocumentRepository } from '../../core/interfaces/repository/i.document.repository';

export class GetReliabilityReportUseCase implements IGetReliabilityReportUseCase {
    constructor(
        private readonly analyzeKeywordsService: IAnalyzeKeywords,
        private readonly reliabilityReportRepository: IReliabilityReportRepository,
        private readonly documentRepository: IDocumentRepository,
    ) {}

    public async getReliabilityReport(
        documentKey: string,
        documentId: number,
    ): Promise<{ reliabilityPercentage: number; isExpired: boolean }> {
        const analyzeKeywordsResponse: AnalyzeKeywordsResponse = await this.analyzeKeywordsService.analyze(documentKey);

        const isExpired: boolean = analyzeKeywordsResponse.isExpired;
        const reliabilityReport: IneReliabilityReport = new IneReliabilityReport();
        const percentage: number = analyzeKeywordsResponse.percentage;
        reliabilityReport.documentId = documentId;
        reliabilityReport.reliabilityPercentage = percentage;

        this.reliabilityReportRepository.save(reliabilityReport);

        const document: LegalDocument = await this.documentRepository.getById(documentId);
        document.verified = percentage >= 90;
        document.validUntil = analyzeKeywordsResponse.lastValidYear;

        this.documentRepository.save(document);

        return { reliabilityPercentage: analyzeKeywordsResponse.percentage, isExpired: isExpired };
    }
}
