import { IVerification } from '../../core/interfaces/domain/i.verification';

export class IsNotExpiredVerificationImpl implements IVerification {
    verify(): boolean {
        throw new Error('Method not implemented.');
    }
}
