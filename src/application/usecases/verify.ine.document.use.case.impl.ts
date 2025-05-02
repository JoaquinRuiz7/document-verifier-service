import { IVerifyDocumentUseCase } from '../interfaces/i.verify.document.use.case';
import { AnalyzeKeywordsResponse } from '../../core/interfaces/domain/i.document.verifier';
import { IReliabilityReportRepository } from '../../core/interfaces/repository/i.reliability.report.repository';
import { IneReliabilityReport } from '../../core/entities/ine.reliability.report';
import { LegalDocument } from '../../core/entities/legal.document';
import { IAnalyzeKeywords } from '../interfaces/i.analyze.keywords';
import { IDocumentRepository } from '../../core/interfaces/repository/i.document.repository';

export class VerifyIneDocumentUseCaseImpl implements IVerifyDocumentUseCase {
    constructor(
        private readonly analyzeKeywordsService: IAnalyzeKeywords,
        private readonly reliabilityReportRepository: IReliabilityReportRepository,
        private readonly documentRepository: IDocumentRepository,
    ) {}

    public async verify(
        documentId: number,
    ): Promise<{ reliabilityPercentage: number; isExpired: boolean }> {
        const document: LegalDocument = await this.documentRepository.getById(documentId);
        const analyzeKeywordsResponse: AnalyzeKeywordsResponse = await this.analyzeKeywordsService.analyze(
            document.key,
        );

        const isExpired: boolean = analyzeKeywordsResponse.isExpired;
        const reliabilityReport: IneReliabilityReport = new IneReliabilityReport();
        const percentage: number = analyzeKeywordsResponse.percentage;
        reliabilityReport.documentId = documentId;
        reliabilityReport.reliabilityPercentage = percentage;

        this.reliabilityReportRepository.save(reliabilityReport);

        document.verified = percentage >= 90;
        document.validUntil = analyzeKeywordsResponse.lastValidYear;

        await this.documentRepository.save(document);

        return { reliabilityPercentage: analyzeKeywordsResponse.percentage, isExpired: isExpired };
    }
}
