export class Op {
  #name: string;
  #args: string[];
  #args2?: string[];
  #braces: boolean;

  constructor(name: string, args: string[], args2: string[] | undefined = undefined, braces = false) {
    this.#name = name;
    this.#args = args;
    this.#args2 = args2;
    this.#braces = braces;
  }

  get name(): string {
    return this.#name;
  }

  get args(): string[] {
    return this.#args;
  }

  get isArgs2(): boolean {
    return this.#args2 !== undefined;
  }
  
  get args2(): string[] {
    return this.#args2!;
  }

  get braces() : boolean {
    return this.#braces;
  }
}
