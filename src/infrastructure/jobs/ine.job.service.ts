import { IJobService } from '../../core/interfaces/jobs/IJobService';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue as Queues } from '../enums/queue';
import { Queue } from 'bullmq';

export class IneJobService implements IJobService {
    constructor(@InjectQueue(Queues.PROCESS_INE) private readonly ineProcessorQueue: Queue) {}

    async enqueue(data: any): Promise<void> {
        await this.ineProcessorQueue.add(`verify-document-${data.documentId}`, data);
    }
}
