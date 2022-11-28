export class Input {
  #name: string;
  #size: number;
  #value: number;

  constructor(name: string, size: number, value: number) {
    this.#name = name;
    this.#size = size;
    this.#value = value;
  }

  get name(): string {
    return this.#name;
  }

  get size(): number {
    return this.#size;
  }

  get value(): number {
    return this.#value;
  }
}
