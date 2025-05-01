import { Controller, Get, Inject, Param } from '@nestjs/common';
import { IGetReliabilityReportUseCase } from '../../application/interfaces/i.get.reliability.report.use.case';

@Controller('document')
export class DocumentController {
    constructor(
        @Inject('GetReliabilityReportUsecase')
        private readonly getReliabilityReportUseCase: IGetReliabilityReportUseCase,
    ) {}

    @Get('/:documentId/reliability-percentage')
    public async getReliabilityPercentage(@Param('documentId') documentId: number) {
        return await this.getReliabilityReportUseCase.getReliabilityReport(documentId);
    }
}
