import { IStorage } from '../../core/interfaces/storage/i.storage';

export class S3Storage implements IStorage {
    getObject(key: string) {
        throw new Error('Method not implemented.');
    }

}