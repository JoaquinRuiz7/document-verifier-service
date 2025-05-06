import { IVerifyDocumentUseCase } from '../interfaces/i.verify.document.use.case';
import { IReliabilityReportRepository } from '../../core/interfaces/repository/i.reliability.report.repository';
import { IneReliabilityReport } from '../../core/entities/ine.reliability.report';
import { LegalDocument } from '../../core/entities/legal.document';
import { IDocumentRepository } from '../../core/interfaces/repository/i.document.repository';
import { ConfidenceScore, IDocumentVerifier } from '../../core/interfaces/domain/i.document.verifier';
import { IStorage } from '../../core/interfaces/storage/i.storage';

export class VerifyIneDocumentUseCaseImpl implements IVerifyDocumentUseCase {
    constructor(
        private readonly storage: IStorage,
        private readonly documentVerifier: IDocumentVerifier,
        private readonly reliabilityReportRepository: IReliabilityReportRepository,
        private readonly documentRepository: IDocumentRepository,
    ) {}

    public async verify(documentId: number): Promise<{ confidence: number }> {
        const document: LegalDocument = await this.documentRepository.getById(documentId);
        const documentData: Buffer = await this.storage.getObject(document.key);
        const score: ConfidenceScore = await this.documentVerifier.verify(documentData);

        let foundReliabilityReport: IneReliabilityReport | null =
            await this.reliabilityReportRepository.findByDocumentId(document.id);
        const reliabilityReport: IneReliabilityReport = foundReliabilityReport
            ? foundReliabilityReport
            : new IneReliabilityReport();

        reliabilityReport.documentId = documentId;
        reliabilityReport.reliabilityPercentage = score.confidence;
        reliabilityReport.attempts++;

        await this.reliabilityReportRepository.save(reliabilityReport);

        document.verified = score.confidence >= 90;

        await this.documentRepository.save(document);
        return { confidence: score.confidence };
    }
}
