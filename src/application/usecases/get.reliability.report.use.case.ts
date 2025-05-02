import { IOpticalCharacterRecognitionProcessor } from '../../core/interfaces/domain/i.optical.character.recognition.processor';
import { IGetReliabilityReportUseCase } from '../interfaces/i.get.reliability.report.use.case';
import { AnalyzeKeywordsResponse, IDocumentVerifier } from '../../core/interfaces/domain/i.document.verifier';
import { IReliabilityReportRepository } from '../../core/interfaces/repository/i.reliability.report.repository';
import { IneReliabilityReport } from '../../core/entities/ine.reliability.report';
import { IStorage } from '../../core/interfaces/storage/i.storage';
import { IDocumentRepository } from '../../core/interfaces/repository/i.document.repository';
import { LegalDocument } from '../../core/entities/legal.document';

export class GetReliabilityReportUseCase implements IGetReliabilityReportUseCase {
    private readonly KEY_WORDS: string[] = [
        'curp',
        'instituto',
        'nacional',
        'electoral',
        'credencial',
        'para',
        'votar',
        'méxico',
        'clave',
        'de',
        'elector',
        'año',
        'registro',
        'domicilio',
        'fecha',
        'nacimiento',
        'estado',
        'municipio',
        'sección',
        'localidad',
        'vicencia',
        'emisión',
    ];

    constructor(
        private readonly documentRepository: IDocumentRepository,
        private readonly opticalCharacterRecognition: IOpticalCharacterRecognitionProcessor,
        private readonly documentVerifier: IDocumentVerifier,
        private readonly reliabilityReportRepository: IReliabilityReportRepository,
        private readonly storage: IStorage,
    ) {}

    public async getReliabilityReport(
        documentKey: string,
        documentId: number,
    ): Promise<{ reliabilityPercentage: number; isExpired: boolean }> {
        const documentBuffer: Buffer = await this.storage.getObject(documentKey);
        const words: string[] = await this.opticalCharacterRecognition.readImageAndExtractText(documentBuffer);

        if (words.length == 0) {
            return { reliabilityPercentage: 0, isExpired: false };
        }

        const analyzeKeywordsResponse: AnalyzeKeywordsResponse = this.documentVerifier.analyzeKeywords(
            this.KEY_WORDS,
            words,
        );

        const isExpired: boolean = this.documentVerifier.isExpired(words);
        const reliabilityReport: IneReliabilityReport = new IneReliabilityReport();
        const percentage: number = analyzeKeywordsResponse.percentage;
        reliabilityReport.documentId = documentId;
        reliabilityReport.reliabilityPercentage = percentage;
        reliabilityReport.validUntil = analyzeKeywordsResponse.lastvalidYear;

        this.reliabilityReportRepository.save(reliabilityReport);

        const document: LegalDocument = await this.documentRepository.getById(documentId);
        document.verified = percentage >= 90;
        document.validUntil = analyzeKeywordsResponse.lastvalidYear;

        this.documentRepository.save(document);

        return { reliabilityPercentage: analyzeKeywordsResponse.percentage, isExpired: isExpired };
    }
}
