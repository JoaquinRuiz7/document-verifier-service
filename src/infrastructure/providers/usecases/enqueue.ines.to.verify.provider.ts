// src/infrastructure/providers/usecase.providers.ts

import { DocumentRepository } from '../../persistence/repository/document.repository';
import { IDocumentRepository } from '../../../core/interfaces/repository/i.document.repository';
import { IneJobService } from '../../jobs/ine.job.service';
import { EnqueueInesToVerifyUseCase } from '../../../application/usecases/enqueue.ines.to.verify';

export const documentRepositoryProvider = {
    provide: 'IDocumentRepository',
    useClass: DocumentRepository,
};

export const jobsProvider = {
    provide: 'IJobService',
    useClass: IneJobService,
};

export const enqueueInesToVerifyUseCase = {
    provide: 'IEnqueueInesToVerifyUseCase',
    useFactory: (documentsRepository: IDocumentRepository, jobService: IneJobService) =>
        new EnqueueInesToVerifyUseCase(documentsRepository, jobService),
    inject: ['IDocumentRepository', 'IJobService'],
};

export const enqueueInesToVerifyProvider = [documentRepositoryProvider, jobsProvider, enqueueInesToVerifyUseCase];
