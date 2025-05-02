export interface IOpticalCharacterRecognitionProcessor {
    readImageAndExtractText(imageUrl: Buffer): Promise<string[]>;
    extractWordsOrdered(): string[];
    cleanAndOrderWords(): string[];
    preProcess(imageBuffer: Buffer): Promise<Buffer>;
}
