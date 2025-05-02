import { IGetDocumentFromStorageUseCase } from '../interfaces/i.get.document.from.storage.use.case';
import { IStorage } from '../../core/interfaces/storage/i.storage';

export class GetDocumentFromStorageUseCase implements IGetDocumentFromStorageUseCase {
    constructor(private readonly storage: IStorage) {}

    getDocument(key: string): Buffer {
        return this.storage.getObject(key);
    }
}
