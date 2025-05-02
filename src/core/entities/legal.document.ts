import { DocumentType } from '../enums/document.type';

export class LegalDocument {
    private _id: number;
    private _userId: number;
    private _documentType: DocumentType;
    private _key: string;
    private _validUntil: number;
    private _verified: boolean;
    private _createdAt: Date;
    private _updatedAt: Date;

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

    get key(): string {
        return this._key;
    }

    set key(value: string) {
        this._key = value;
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

    get validUntil(): number {
        return this._validUntil;
    }

    set validUntil(value: number) {
        this._validUntil = value;
    }

    get verified(): boolean {
        return this._verified;
    }

    set verified(value: boolean) {
        this._verified = value;
    }
}
