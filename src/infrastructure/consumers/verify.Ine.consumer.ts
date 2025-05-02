import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Queue } from '../enums/queue';
import { Job } from 'bullmq';
import { Inject, Logger } from '@nestjs/common';
import { IVerifyDocumentUseCase } from '../../application/interfaces/i.verify.document.use.case';

@Processor(Queue.PROCESS_INE)
export class VerifyIneConsumer extends WorkerHost {
    private readonly logger: Logger = new Logger('VerifyIneConsumer');
    constructor(
        @Inject('IVerifyDocumentUseCase')
        private readonly verifyDocumentUseCase: IVerifyDocumentUseCase,
    ) {
        super();
    }

    async process(job: Job<any, any, string>): Promise<any> {
        try {
            const { data } = job;
            const key: string = data.key;
            this.logger.log(`Processing document with key ${key}`);
            // @ts-ignore
            await this.verifyDocumentUseCase.verify(data.documentId);
            this.logger.log(`Document with key ${key} finished processing successfully.`);
        } catch (e) {
            this.logger.error(`Error processing document with key ${job.data.key}`);
            this.logger.error(e);
        }
    }
}
