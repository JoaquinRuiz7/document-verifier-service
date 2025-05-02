export interface IOpticalCharacterRecognitionProcessor {
    readImageAndExtractText(imageUrl: string): Promise<string[]>;
    extractWordsOrdered(): string[];
    cleanAndOrderWords(): string[];
    preProcess(imageBuffer:Buffer): Promise<Buffer>;
}
