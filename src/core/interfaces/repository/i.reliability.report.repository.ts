import { IneReliabilityReport } from '../../entities/ine.reliability.report';

export interface IReliabilityReportRepository {
    save(reliabilityReport: IneReliabilityReport): void;
}
