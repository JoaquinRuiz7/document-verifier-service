import { IVerification } from '../../../core/interfaces/domain/i.verification';

export class HasValidCurpVerificationImpl implements IVerification {
    verify(extractedWords: string[]): boolean {
        // Normalize all words: remove symbols, uppercase, trim
        const normalizedWords = extractedWords.map((w) =>
          w.replace(/[^A-Z0-9]/gi, '').toUpperCase()
        );

        // Try to find a word that matches full CURP pattern
        const curpPattern = /^[A-Z]{4}\d{6}[A-Z]{6}\d{2}$/;
        const curp = normalizedWords.find((w) => curpPattern.test(w));
        if (!curp) return false;

        // Extract the date from the CURP (YYMMDD)
        const curpDate = curp.slice(4, 10);

        // Try to find a standalone date like 01011990 or 01/01/1990
        const datePattern = /\b(0[1-9]|[12][0-9]|3[01])[\/\-]?(0[1-9]|1[0-2])[\/\-]?(\d{4})\b/;
        const rawDate = normalizedWords.find((w) => datePattern.test(w));
        if (!rawDate) return false;

        const match = rawDate.match(datePattern);
        if (!match) return false;

        const [, day, month, year] = match;
        const formattedDate = year.slice(2) + month + day;

        return curp.length === 18 && curpDate === formattedDate;
    }
}