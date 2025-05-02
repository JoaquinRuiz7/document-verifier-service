import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Queue } from '../enums/queue';
import { Job } from 'bullmq';
import { Inject } from '@nestjs/common';
import { IGetReliabilityReportUseCase } from '../../application/interfaces/i.get.reliability.report.use.case';

@Processor(Queue.PROCESS_INE)
export class VerifyIneConsumer extends WorkerHost {
    constructor(
        @Inject('GetReliabilityReportUsecase')
        private readonly getReliabilityReportUseCase: IGetReliabilityReportUseCase,
    ) {
        super();
    }

    async process(job: Job<any, any, string>): Promise<any> {
        console.log(job);
        // @ts-ignore
        await this.getReliabilityReportUseCase.getReliabilityReport(job.documentId);
    }
}
