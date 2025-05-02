import { GetObjectCommand, GetObjectCommandOutput, S3Client } from '@aws-sdk/client-s3';
import { Readable } from 'stream';
import { IStorage } from '../../core/interfaces/storage/i.storage';
import { Inject } from '@nestjs/common';
import { S3_CLIENT } from './s3.provider';

export class S3Storage implements IStorage {
    constructor(@Inject(S3_CLIENT) private readonly s3Client: S3Client) {}

    async getObject(key: string): Promise<Buffer> {
        const command = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET,
            Key: key,
        });

        const response: GetObjectCommandOutput = await this.s3Client.send(command);

        if (!response.Body || !(response.Body instanceof Readable)) {
            throw new Error('Invalid S3 response body');
        }

        return this.streamToBuffer(response.Body);
    }

    private async streamToBuffer(stream: Readable): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            const chunks: Buffer[] = [];
            stream.on('data', (chunk) => chunks.push(chunk));
            stream.on('end', () => resolve(Buffer.concat(chunks)));
            stream.on('error', reject);
        });
    }
}
