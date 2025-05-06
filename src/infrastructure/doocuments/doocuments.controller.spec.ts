import { Test, TestingModule } from '@nestjs/testing';
import { DoocumentsController } from './doocuments.controller';

describe('DoocumentsController', () => {
    let controller: DoocumentsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [DoocumentsController],
        }).compile();

        controller = module.get<DoocumentsController>(DoocumentsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
