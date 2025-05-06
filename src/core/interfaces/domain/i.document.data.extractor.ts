export type DocumentData = {
    expirationDate: Date;
    isExpired: boolean;
};
export interface IDocumentDataExtractor {
    extractData(document: Buffer): Promise<DocumentData>;
}
