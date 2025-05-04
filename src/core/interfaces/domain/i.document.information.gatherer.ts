export interface IDocumentDataExtractor {
    getExpirationDate(words: string[]): number;
    getHoldersName(words: string[]): number;
}
