import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'ine_reliability_report' })
export class ReliabilityReportEntity {
    @PrimaryGeneratedColumn({ name: 'id' }) private _id: number;

    @Column({ name: 'document_id' }) private _documentId: number;

    @Column({ name: 'reliability_percentage' }) private _reliabilityPercentage: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' }) private _createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' }) private _updatedAt: Date;

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get documentId(): number {
        return this._documentId;
    }

    set documentId(value: number) {
        this._documentId = value;
    }

    get reliabilityPercentage(): number {
        return this._reliabilityPercentage;
    }

    set reliabilityPercentage(value: number) {
        this._reliabilityPercentage = value;
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
}
