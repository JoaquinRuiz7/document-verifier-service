export interface IGetDocumentFromStorageUseCase {
    getDocument(key: string): Buffer;
}
