export function capitalizeWords(sentence: string): string {
    if (sentence.length === 0) return sentence;

    const words = sentence.split(/\s|-/);

    const capitalizedWords = words.map((word) => {
        if (word.length === 0) return word;

        const firstLetter = word.charAt(0).toUpperCase();
        const restOfString = word.slice(1);

        return `${firstLetter}${restOfString}`;
    });

    return capitalizedWords.join(" ");
}

export function capitalizeFirstLetter(input: string): string {
    if (input.length === 0) return input;
    const firstLetter = input.charAt(0).toUpperCase();
    const restOfString = input.slice(1);
    return `${firstLetter}${restOfString}`;
}