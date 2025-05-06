import { Controller, Inject, Param, Post } from '@nestjs/common';
import { IVerifyDocumentUseCase } from '../../application/interfaces/i.verify.document.use.case';

@Controller('documents')
export class DoocumentsController {
    constructor(
        @Inject('IVerifyDocumentUseCase') private readonly documentVerificationUseCase: IVerifyDocumentUseCase,
    ) {}

    @Post('/:id/verify')
    public async verify(@Param('id') id: number) {
        return await this.documentVerificationUseCase.verify(id);
    }
}
