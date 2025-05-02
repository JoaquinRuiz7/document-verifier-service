import { LegalDocument } from '../../entities/legal.document';

export interface IDocumentRepository {
    getById(id: number): Promise<LegalDocument>;
    save(legalDocument: LegalDocument): Promise<void>;
    getDocumentsToProcess(): Promise<LegalDocument[]>;
}
