import { IAnalyzeDocumentUseCase } from '../interfaces/i.analyze.document.use.case';

//TODO this class extracts data like valid until year and checks is the document is expired
export class AnalyzeDocumentUseCaseImpl implements IAnalyzeDocumentUseCase {
    analyze(): Promise<void> {
        throw new Error('Method not implemented.');
    }

}