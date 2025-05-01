import { IDocumentRepository } from '../../core/interfaces/repository/i.document.repository';
import { LegalDocument } from '../../core/entities/legal.document';
import { IOpticalCharacterRecognitionProcessor } from '../../core/interfaces/domain/i.optical.character.recognition.processor';
import { IGetReliabilityReportUseCase } from '../interfaces/i.get.reliability.report.use.case';
import { AnalyzeKeywordsResponse, IDocumentVerifier } from '../../core/interfaces/domain/i.document.verifier';

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
        'vigencia',
        'emisión',
    ];

    constructor(
        private readonly documentRepository: IDocumentRepository,
        private readonly opticalCharacterRecognition: IOpticalCharacterRecognitionProcessor,
        private readonly documentVerifier: IDocumentVerifier,
    ) {}

    public async getReliabilityReport(
        documentId: number,
    ): Promise<{ reliabilityPercentage: number; isExpired: boolean }> {
        const document: LegalDocument = await this.documentRepository.getById(documentId);
        const words: string[] = await this.opticalCharacterRecognition.readImageAndExtractText(document.key);

        if (words.length == 0) {
            return { reliabilityPercentage: 0, isExpired: false };
        }
        const analyzeKeywordsResponse: AnalyzeKeywordsResponse = this.documentVerifier.analyzeKeywords(
            this.KEY_WORDS,
            words,
        );
        const isExpired: boolean = this.documentVerifier.isExpired(words);
        return { reliabilityPercentage: analyzeKeywordsResponse.percentage, isExpired: isExpired };
    }
}
