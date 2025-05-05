import { LegalDocument } from '../../../core/entities/legal.document';
import { LegalDocument as LegalDocumentEntity } from '../model/legal.document.entity';

export class LegalDocumentMapper {
    public static toEntity(legalDocument: LegalDocument): LegalDocumentEntity {
        const entity = new LegalDocumentEntity();
        entity.id = legalDocument.id;
        entity.userId = legalDocument.userId;
        entity.documentKey = legalDocument.key;
        entity.documentType = legalDocument.documentType;
        entity.verified = legalDocument.verified;
        entity.validUntil = legalDocument.validUntil;
        entity.isExpired = legalDocument.isExpired;
        entity.createdAt = legalDocument.createdAt;
        entity.updatedAt = new Date();
        return entity;
    }

    public static toDomain(entity: LegalDocumentEntity): LegalDocument {
        const domain = new LegalDocument();
        console.log({entity});

        domain.id = entity.id;
        domain.userId = entity.userId;
        domain.key = entity.documentKey;
        domain.documentType = entity.documentType;
        domain.verified = entity.verified;
        domain.validUntil = entity.validUntil;
        domain.createdAt = entity.createdAt;
        domain.isExpired = entity.isExpired;
        domain.updatedAt = entity.updatedAt;

        console.log({domain});

        return domain;
    }
}
