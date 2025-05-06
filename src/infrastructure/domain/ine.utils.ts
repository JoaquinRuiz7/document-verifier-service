export class IneUtils {
    public static getYears(words: string[]): { emissionYear: string | null; lastValidYear: string | null } {
        const lowerWords: string[] = words.map((w) => w.toLowerCase());
        const emissionYearIndex: number = lowerWords.indexOf('emisión');
        const validUntilIndex: number =
            lowerWords.indexOf('vicencia') !== -1 ? lowerWords.indexOf('vicencia') : lowerWords.indexOf('vigencia');

        if (emissionYearIndex === -1 || validUntilIndex === -1) {
            return { emissionYear: null, lastValidYear: null };
        }

        const emissionYear: string = lowerWords[emissionYearIndex + 1];
        const lastValidYear: string = lowerWords[validUntilIndex + 1];

        return {
            emissionYear,
            lastValidYear,
        };
    }
}
