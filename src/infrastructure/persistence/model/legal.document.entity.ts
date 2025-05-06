import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { DocumentType } from '../../../core/enums/document.type';

@Entity({ name: 'user_legal_documents' })
export class LegalDocument {
    @PrimaryGeneratedColumn({ name: 'id' })
    private _id: number;
    @Column({ name: 'user_id' })
    private _userId: number;
    @Column({ name: 'document_type' })
    private _documentType: DocumentType;
    @Column({ name: 'document_key' })
    private _documentKey: string;
    @Column({ name: 'verified' })
    private _verified: boolean;
    @Column({ name: 'valid_until',type: 'date' })
    private _validUntil: Date;
    @Column({ name: 'is_expired' })
    private _isExpired: boolean;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' }) private _createdAt: Date;
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' }) private _updatedAt: Date;

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get userId(): number {
        return this._userId;
    }

    set userId(value: number) {
        this._userId = value;
    }

    get documentType(): DocumentType {
        return this._documentType;
    }

    set documentType(value: DocumentType) {
        this._documentType = value;
    }

    get documentKey(): string {
        return this._documentKey;
    }

    set documentKey(value: string) {
        this._documentKey = value;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    set createdAt(value: Date) {
        this._createdAt = value;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }

    set updatedAt(value: Date) {
        this._updatedAt = value;
    }

    set verified(value: boolean) {
        this._verified = value;
    }

    get verified(): boolean {
        return this._verified;
    }

    get validUntil(): Date {
        return this._validUntil;
    }

    set validUntil(value: Date) {
        this._validUntil = value;
    }

    get isExpired(): boolean {
        return this._isExpired;
    }

    set isExpired(value: boolean) {
        this._isExpired = value;
    }
}
