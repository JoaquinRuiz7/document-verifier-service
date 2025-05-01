export class DocumentNotFoundException extends Error {
    constructor(message: string = 'Document not found.') {
        super(message);
        this.name = 'DocumentNotFoundException';
    }
}
