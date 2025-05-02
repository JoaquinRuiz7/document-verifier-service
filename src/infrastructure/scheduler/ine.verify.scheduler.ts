import { IEnqueueInesToVerifyUseCase } from '../../application/interfaces/i.enqueue.ines.to.verify.use.case';
import { Cron } from '@nestjs/schedule';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class IneVerifyScheduler {
    constructor(
        @Inject('EnqueueInesToVerifyUseCase')
        private readonly enqueueInesToVerifyUseCase: IEnqueueInesToVerifyUseCase,
    ) {}

    @Cron('*/1 * * * *')
    public async verifyInes() {
        await this.enqueueInesToVerifyUseCase.enqueue();
    }
}
