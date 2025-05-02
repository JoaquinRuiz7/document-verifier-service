import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { ApplicationModule } from './application/application.module';
import { DatabaseModule } from './infrastructure/config/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { DocumentController } from './presentation/controllers/document.controller';
import { GetReliabilityReportUseCase } from './application/usecases/get.reliability.report.use.case';
import { useCaseProviders } from './infrastructure/providers/verify.document.usecase.provider';
import { BullModule } from '@nestjs/bullmq';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        InfrastructureModule,
        ApplicationModule,
        DatabaseModule,
        BullModule.forRoot({
            connection: {
                host: 'localhost',
                port: 6379,
            },
        }),
    ],
    exports: [...useCaseProviders],
    controllers: [AppController, DocumentController],
    providers: [AppService, GetReliabilityReportUseCase, ...useCaseProviders],
})
export class AppModule {}
