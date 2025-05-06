import { IVerification } from '../../../core/interfaces/domain/i.verification';

export class HasFaceVerification implements IVerification {
    verify(extractedWords: string[]): boolean {
        throw new Error('Method not implemented.');
    }
}
