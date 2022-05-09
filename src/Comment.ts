export class Comment {
    #value: string | string[];
    constructor(value: string | string[]) {
        this.#value = value;
    }
    get value(): string | string[] {
        return this.#value;
    }
}