import { createWorker } from 'tesseract.js';
import fetch from 'node-fetch';
import { IOpticalCharacterRecognitionProcessor } from '../../core/interfaces/domain/i.optical.character.recognition.processor';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TesseractIOpticalCharacterRecognition implements IOpticalCharacterRecognitionProcessor {
    private orderedWords: string[] = [];

    async readImageAndExtractText(imageUrl: string): Promise<string[]> {
        const response = await fetch(imageUrl);
        if (!response.ok) throw new Error('Failed to fetch image');
        const buffer = await response.buffer();

        const worker = await createWorker('spa');

        try {
            await worker.setParameters({
                // @ts-ignore
                tessedit_pageseg_mode: '3',
                preserve_interword_spaces: '1',
            });

            const {
                data: { text },
            } = await worker.recognize(buffer);

            this.orderedWords = this.cleanAndOrderWords(text);
            return this.orderedWords;
        } finally {
            await worker.terminate();
        }
    }

    extractWordsOrdered(): string[] {
        return this.orderedWords;
    }

    // @ts-ignore
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
