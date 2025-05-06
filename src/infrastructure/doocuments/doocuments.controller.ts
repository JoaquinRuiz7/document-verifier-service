import { Controller, Inject, Param, Post } from '@nestjs/common';
import { IProcessDocumentUseCase } from '../../application/interfaces/i.process.document.use.case';

@Controller('documents')
export class DoocumentsController {
    constructor(
        @Inject('IProcessDocumentUseCase') private readonly documentVerificationUseCase: IProcessDocumentUseCase,
    ) {}

    @Post('/:id/verify')
    public async verify(@Param('id') id: number) {
        return await this.documentVerificationUseCase.process(id);
    }
}
