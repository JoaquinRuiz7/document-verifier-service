import { Module } from '@nestjs/common';
import { PersistenceModule } from './persistence/persistence.module';
import { DatabaseModule } from './config/database/database.module';

@Module({
    imports: [PersistenceModule, DatabaseModule],
})
export class InfrastructureModule {}
