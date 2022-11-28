export class Op {
  #name: string;
  #args: string[];

  constructor(name: string, args: string[]) {
    this.#name = name;
    this.#args = args;
  }

  get name(): string {
    return this.#name;
  }

  get args(): string[] {
    return this.#args;
  }
}
