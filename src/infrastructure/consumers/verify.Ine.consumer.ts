import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Queue } from '../enums/queue';
import { Job } from 'bullmq';
import { Inject, Logger } from '@nestjs/common';
import { IGetReliabilityReportUseCase } from '../../application/interfaces/i.get.reliability.report.use.case';

@Processor(Queue.PROCESS_INE)
export class VerifyIneConsumer extends WorkerHost {
    private readonly logger: Logger = new Logger('VerifyIneConsumer');
    constructor(
        @Inject('GetReliabilityReportUsecase')
        private readonly getReliabilityReportUseCase: IGetReliabilityReportUseCase,
    ) {
        super();
    }

    async process(job: Job<any, any, string>): Promise<any> {
        const { data } = job;
        const key: string = data.key;
        this.logger.log(`Processing document with key ${key}`);
        // @ts-ignore
        await this.getReliabilityReportUseCase.getReliabilityReport(key, data.documentId);
        this.logger.log(`Document with key ${key} finished processing successfully}`);
    }
}
