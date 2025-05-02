import { IDocumentRepository } from '../../../core/interfaces/repository/i.document.repository';
import { Inject, Injectable } from '@nestjs/common';
import { DatabaseConstants } from '../../config/database/database.constants';
import { Repository } from 'typeorm';
import { LegalDocument as LegalDocumentEntity } from '../model/legal.document.entity';
import { LegalDocument } from '../../../core/entities/legal.document';
import { LegalDocumentMapper } from '../mapper/legal.document.mapper';
import { DocumentNotFoundException } from '../../../core/exceptions/document.not.found.exception';
import { DocumentType } from '../../../core/enums/document.type';

@Injectable()
export class DocumentRepository implements IDocumentRepository {
    constructor(
        @Inject(DatabaseConstants.USERS_LEGAL_DOCUMENTS_REPOSITORY)
        private readonly documentRepository: Repository<LegalDocumentEntity>,
    ) {}

    async getDocumentsToProcess(): Promise<LegalDocument[]> {
        const documents: LegalDocumentEntity[] = await this.documentRepository.find({
            where: {
                // @ts-ignore
                _documentType: DocumentType.INE_IMAGE,
                _verified: false,
            },
            take: 200,
        });

        return documents.map((d: LegalDocumentEntity) => LegalDocumentMapper.toDomain(d));
    }

    async save(legalDocument: LegalDocument) {
        await this.documentRepository.save(LegalDocumentMapper.toEntity(legalDocument));
    }

    async getById(id: number): Promise<LegalDocument> {
        const document: LegalDocumentEntity | null = await this.documentRepository.findOne({
            where: {
                // @ts-ignore
                _id: id,
            },
        });

        if (!document) {
            throw new DocumentNotFoundException(`Document with id ${id} not found.`);
        }

        return LegalDocumentMapper.toDomain(document);
    }
}
