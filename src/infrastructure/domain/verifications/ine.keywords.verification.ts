import { IVerification } from '../../../core/interfaces/domain/i.verification';

export class IneKeywordsVerification implements IVerification {
    private readonly KEY_WORDS: string[] = [
        'curp','instituto','nacional','electoral','credencial','para','votar','mexico',
        'clave','de','elector','ano','registro','domicilio','fecha','nacimiento',
        'estado','municipio','seccion','localidad','vigencia','emision'
    ];

    private distance(a: string, b: string): number {
        const dp = Array.from({ length: b.length + 1 }, (_, j) => j);
        for (let i = 1; i <= a.length; i++) {
            let prev = i - 1;
            dp[0] = i;
            for (let j = 1; j <= b.length; j++) {
                const temp = dp[j];
                dp[j] = a[i - 1] === b[j - 1]
                  ? prev
                  : 1 + Math.min(prev, dp[j - 1], dp[j]);
                prev = temp;
            }
        }
        return dp[b.length];
    }

    private similarity(a: string, b: string): number {
        const dist = this.distance(a, b);
        return 1 - dist / Math.max(a.length, b.length);
    }

    verify(extractedWords: string[]): boolean {
        // 🧹 clean OCR noise
        const normalizedWords = extractedWords
          .map((w) =>
            w
              .toLowerCase()
              .normalize('NFD')
              .replace(/\p{Diacritic}/gu, '')
              .replace(/[^a-z0-9]/g, '')
          )
          .filter(
            (w) =>
              w.length >= 3 &&                     // drop 1-2-letter trash
              /[a-z]/.test(w) &&                   // must have letters
              !/^[0-9]+$/.test(w)                  // not pure numbers
          );

        let hits = 0;

        for (const keyword of this.KEY_WORDS) {
            const found = normalizedWords.some(
              (w) => this.similarity(w, keyword) > 0.7
            );
            if (found) hits++;
        }

        const percentage = Math.ceil((hits / this.KEY_WORDS.length) * 100);
        console.log({ hits, percentage, totalWords: normalizedWords.length });

        return percentage >= 50; // tweak if needed
    }
}