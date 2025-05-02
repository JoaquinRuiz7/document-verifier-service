import { IEnqueueInesToVerifyUseCase } from '../interfaces/i.enqueue.ines.to.verify.use.case';
import { IDocumentRepository } from '../../core/interfaces/repository/i.document.repository';
import { LegalDocument } from '../../core/entities/legal.document';
import { IJobService } from '../../core/interfaces/jobs/IJobService';

export class EnqueueInesToVerifyUseCase implements IEnqueueInesToVerifyUseCase {
    constructor(
        private readonly documentsRepository: IDocumentRepository,
        private readonly jobService: IJobService,
    ) {}

    async enqueue(): Promise<void> {
        const inesToProcess: LegalDocument[] = await this.documentsRepository.getDocumentsToProcess();
        inesToProcess.forEach((ine: LegalDocument) => this.jobService.enqueue({ key: ine.key, documentId: ine.id }));
    }
}
