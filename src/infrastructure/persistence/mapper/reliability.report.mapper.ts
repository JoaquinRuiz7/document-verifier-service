import { ReliabilityReportEntity } from '../model/reliability.report.entity';
import { IneReliabilityReport } from '../../../core/entities/ine.reliability.report';

export class ReliabilityReportMapper {
    static toDomain(entity: ReliabilityReportEntity): IneReliabilityReport {
        const report = new IneReliabilityReport();

        report.id = entity.id;
        report.documentId = entity.documentId;
        report.reliabilityPercentage = entity.reliabilityPercentage;
        report.verified = entity.verified;
        report.createdAt = entity.createdAt;
        report.updatedAt = entity.updatedAt;

        return report;
    }

    static toEntity(domain: IneReliabilityReport): ReliabilityReportEntity {
        const entity = new ReliabilityReportEntity();

        entity.id = domain.id;
        entity.documentId = domain.documentId;
        entity.reliabilityPercentage = domain.reliabilityPercentage;
        entity.verified = domain.verified;
        entity.createdAt = domain.createdAt;
        entity.updatedAt = domain.updatedAt;

        return entity;
    }
}
