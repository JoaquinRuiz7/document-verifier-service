import { createWorker } from 'tesseract.js';
import {
    IOpticalCharacterRecognitionProcessor,
} from '../../core/interfaces/domain/i.optical.character.recognition.processor';
import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';

@Injectable()
export class TesseractIOpticalCharacterRecognitionImpl implements IOpticalCharacterRecognitionProcessor {
    private orderedWords: string[] = [];

    async preProcess(imageBuffer: Buffer): Promise<Buffer> {
        return await sharp(imageBuffer)
          .resize({ width: 1600, withoutEnlargement: true })
          .greyscale()
          .threshold(180) // binarize to clean background noise
          .normalize()
          .median(1) // light denoise
          .toFormat('png')
          .toBuffer();
    }

    async readImageAndExtractText(image: Buffer): Promise<string[]> {
        const enhancedImage: Buffer = await this.preProcess(image);

        const worker = await createWorker('spa');

        try {
            await worker.setParameters({
                // @ts-ignore
                tessedit_pageseg_mode: '6',
                preserve_interword_spaces: '1',
            });

            const {
                data: { text },
            } = await worker.recognize(enhancedImage);

            this.orderedWords = this.cleanAndOrderWords(text);
            return this.orderedWords;
        } finally {
            await worker.terminate();
        }
    }

    extractWordsOrdered(): string[] {
        return this.orderedWords;
    }

    cleanAndOrderWords(text: string): string[] {
        return text
            .split(/\s+/)
            .map((word) =>
                word
                    .toLowerCase()
                    .replace(/[^a-z0-9áéíóúñ]/g, '')
                    .trim(),
            )
            .filter(Boolean);
    }
}
