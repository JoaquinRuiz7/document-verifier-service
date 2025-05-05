import { IneReliabilityReport } from 'src/core/entities/ine.reliability.report';
import { IReliabilityReportRepository } from '../../../core/interfaces/repository/i.reliability.report.repository';
import { Inject, Injectable } from '@nestjs/common';
import { DatabaseConstants } from '../../config/database/database.constants';
import { Repository } from 'typeorm';
import { ReliabilityReportEntity } from '../model/reliability.report.entity';
import { ReliabilityReportMapper } from '../mapper/reliability.report.mapper';

@Injectable()
export class ReliabilityReportRepository implements IReliabilityReportRepository {
    constructor(
        @Inject(DatabaseConstants.INE_RELIABILITY_REPORT_REPOSITORY)
        private readonly ineReliabilityReportRepository: Repository<ReliabilityReportEntity>,
    ) {}

    async findByDocumentId(id: number): Promise<IneReliabilityReport | null> {
        const reliabilityReport: ReliabilityReportEntity | null = await this.ineReliabilityReportRepository.findOne({
            where: {
                // @ts-ignore
                _documentId: id,
            },
        });

        if (!reliabilityReport) {
            return null;
        }

        return ReliabilityReportMapper.toDomain(reliabilityReport);
    }

    async save(reliabilityReport: IneReliabilityReport): Promise<void> {
        await this.ineReliabilityReportRepository.save(ReliabilityReportMapper.toEntity(reliabilityReport));
    }
}
