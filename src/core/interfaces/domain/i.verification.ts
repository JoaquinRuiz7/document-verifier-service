export interface IVerification {
    verify(document: Buffer): Promise<boolean>;
}
