import { IProcessDocumentUseCase } from '../interfaces/i.process.document.use.case';
import { IReliabilityReportRepository } from '../../core/interfaces/repository/i.reliability.report.repository';
import { IneReliabilityReport } from '../../core/entities/ine.reliability.report';
import { LegalDocument } from '../../core/entities/legal.document';
import { IDocumentRepository } from '../../core/interfaces/repository/i.document.repository';
import { ConfidenceScore, IDocumentVerifier } from '../../core/interfaces/domain/i.document.verifier';
import { IStorage } from '../../core/interfaces/storage/i.storage';
import { DocumentData, IDocumentDataExtractor } from '../../core/interfaces/domain/i.document.data.extractor';

export class ProcessIneDocumentUseCaseImpl implements IProcessDocumentUseCase {
    constructor(
        private readonly storage: IStorage,
        private readonly documentVerifier: IDocumentVerifier,
        private readonly reliabilityReportRepository: IReliabilityReportRepository,
        private readonly documentRepository: IDocumentRepository,
        private readonly documentDataExtractor: IDocumentDataExtractor,
    ) {}

    public async process(documentId: number): Promise<{ confidence: number }> {
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
        const documentInformation: DocumentData = await this.documentDataExtractor.extractData(documentData);
        document.verified = score.confidence >= 90;
        document.isExpired = documentInformation.isExpired;
        document.validUntil = documentInformation.expirationDate!;

        await this.documentRepository.save(document);
        return { confidence: score.confidence };
    }
}
