import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue as Queues } from '../enums/queue';
import { Job, Queue } from 'bullmq';

@Injectable()
export class VerifyInesService {
    constructor(@InjectQueue(Queues.PROCESS_INE) private readonly ineProcessorQueue: Queue) {}

    public async enqueueToProcess(documentId: number) {
        const job: Job = await this.ineProcessorQueue.add('verify-ine', {
            documentId,
        });
    }
}
