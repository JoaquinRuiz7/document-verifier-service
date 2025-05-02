export interface IStorage {
    getObject(key: string): Promise<Buffer>;
}
