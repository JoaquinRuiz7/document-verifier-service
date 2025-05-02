// src/infrastructure/aws/s3.provider.ts

import { S3Client } from '@aws-sdk/client-s3';

export const S3_CLIENT = 'S3_CLIENT';

export const S3Provider = {
    provide: S3_CLIENT,
    useFactory: () => {
        return new S3Client({
            region: process.env.AWS_REGION || 'us-east-2',
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY!,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
            },
        });
    },
};
