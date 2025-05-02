export class IneReliabilityReport {
    private _id: number;
    private _documentId: number;
    private _reliabilityPercentage: number;
    private _createdAt: Date;
    private _updatedAt: Date;

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
