export interface IOpticalCharacterRecognitionProcessor {
    readImageAndExtractText(imageUrl: Buffer): Promise<string[]>;
    extractWordsOrdered(): string[];
    cleanAndOrderWords(text: string): string[];
    preProcess(imageBuffer: Buffer): Promise<Buffer>;
}
