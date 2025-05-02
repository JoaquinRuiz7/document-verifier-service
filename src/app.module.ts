import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { ApplicationModule } from './application/application.module';
import { DatabaseModule } from './infrastructure/config/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { VerifyIneDocumentUseCaseImpl } from './application/usecases/verify.ine.document.use.case.impl';
import { BullModule } from '@nestjs/bullmq';
import { JobsModule } from './infrastructure/jobs/jobs.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        ScheduleModule.forRoot(),
        InfrastructureModule,
        ApplicationModule,
        DatabaseModule,
        BullModule.forRoot({
            connection: {
                host: 'localhost',
                port: 6379,
            },
        }),
        JobsModule,
    ],
    controllers: [AppController],
    providers: [AppService, VerifyIneDocumentUseCaseImpl],
})
export class AppModule {}
