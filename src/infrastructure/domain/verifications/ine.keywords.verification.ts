import { IVerification } from '../../../core/interfaces/domain/i.verification';

export class IneKeywordsVerification implements IVerification {
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

    verify(extractedWords: string[]): boolean {
        const lowerExtractedWords: string[] = extractedWords.map((w) => w.toLowerCase());
        const found: string[] = this.KEY_WORDS.filter((kw) => lowerExtractedWords.includes(kw.toLowerCase()));
        const percentage: number = Math.ceil((found.length / this.KEY_WORDS.length) * 100);
        return percentage > 90;
    }
}
