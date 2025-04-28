import { LegalDocument } from '../../entities/legal.document';

export interface IDocumentRepository {
    getById(id: number);
    save(legalDocument: LegalDocument);
}
