import { DatabaseConstants } from './database.constants';
import { DataSource } from 'typeorm';
import { LegalDocument } from '../../persistence/model/legal.document.entity';

export const legalDocumentsProvider = [
    {
        provide: DatabaseConstants.USERS_LEGAL_DOCUMENTS_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(LegalDocument),
        inject: [DatabaseConstants.DATA_SOURCE],
    },
];

export const databaseProviders = [
    {
        provide: DatabaseConstants.DATA_SOURCE,
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'postgres',
                host: process.env.DATABASE_HOST,
                port: parseInt(process.env.DATABASE_PORT!),
                username: process.env.DATABASE_USERNAME,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_NAME,
                schema: process.env.DATABASE_SCHEMA,
                entities: [`${__dirname}/../../**/*.entity{.ts,.js}`],
                synchronize: false,
            });

            return dataSource.initialize();
        },
    },
];
