export type DocumentData = {
    expirationDate: Date | null;
    isExpired: boolean;
};
export interface IDocumentDataExtractor {
    extractData(document: Buffer): Promise<DocumentData >;
}
