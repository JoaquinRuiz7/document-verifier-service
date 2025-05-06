export type DocumentData = {
    expirationDate: Date;
    holdersName: string;
    isExpired: boolean;
};
export interface IDocumentDataExtractor {
    extractData(document: Buffer): Promise<DocumentData>;
}
