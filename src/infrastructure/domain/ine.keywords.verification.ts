import { IVerification } from '../../core/interfaces/domain/i.verification';
import { IOpticalCharacterRecognitionProcessor } from '../../core/interfaces/domain/i.optical.character.recognition.processor';

export class IneKeywordsVerification implements IVerification {
    constructor(private readonly ocr: IOpticalCharacterRecognitionProcessor) {}
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

    async verify(document: Buffer): Promise<boolean> {
        const extractedWords: string[] = await this.ocr.readImageAndExtractText(document);
        const lowerExtractedWords: string[] = extractedWords.map((w) => w.toLowerCase());
        const found: string[] = this.KEY_WORDS.filter((kw) => lowerExtractedWords.includes(kw.toLowerCase()));
        const percentage: number = Math.ceil((found.length / this.KEY_WORDS.length) * 100);
        return percentage > 90;
    }
}
